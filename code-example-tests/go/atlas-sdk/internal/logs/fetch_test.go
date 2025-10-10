package logs

import (
	"context"
	"errors"
	"fmt"
	"io"
	"strings"
	"testing"

	internalerrors "atlas-sdk-examples/internal/errors"

	"atlas-sdk-examples/internal/fileutils"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"go.mongodb.org/atlas-sdk/v20250219001/admin"
	"go.mongodb.org/atlas-sdk/v20250219001/mockadmin"
)

func TestFetchHostLogs_Unit(t *testing.T) {
	t.Parallel()
	ctx := context.Background()

	// common params
	params := &admin.GetHostLogsApiParams{
		GroupId:  "gID",
		HostName: "hName",
		LogName:  "mongodb",
	}

	cases := []struct {
		name      string
		setup     func(m *mockadmin.MonitoringAndLogsApi)
		wantErr   bool
		wantBody  string
		errorType string
	}{
		{
			name:    "API error",
			wantErr: true,
			setup: func(m *mockadmin.MonitoringAndLogsApi) {
				m.EXPECT().
					GetHostLogs(mock.Anything, params.GroupId, params.HostName, params.LogName).
					Return(admin.GetHostLogsApiRequest{ApiService: m}).Once()
				m.EXPECT().
					GetHostLogsExecute(mock.Anything).
					Return(nil, nil, fmt.Errorf("API error")).Once()
			},
		},
		{
			name:     "Successful response",
			wantErr:  false,
			wantBody: "log-data",
			setup: func(m *mockadmin.MonitoringAndLogsApi) {
				m.EXPECT().
					GetHostLogs(mock.Anything, params.GroupId, params.HostName, params.LogName).
					Return(admin.GetHostLogsApiRequest{ApiService: m}).Once()
				m.EXPECT().
					GetHostLogsExecute(mock.Anything).
					Return(io.NopCloser(strings.NewReader("log-data")), nil, nil).Once()
			},
		},
		{
			name:      "NotFoundError when response is nil",
			wantErr:   true,
			errorType: "NotFoundError",
			setup: func(m *mockadmin.MonitoringAndLogsApi) {
				m.EXPECT().
					GetHostLogs(mock.Anything, params.GroupId, params.HostName, params.LogName).
					Return(admin.GetHostLogsApiRequest{ApiService: m}).Once()
				m.EXPECT().
					GetHostLogsExecute(mock.Anything).
					Return(nil, nil, nil).Once() // Return nil response but no error
			},
		},
	}

	for _, tc := range cases {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			mockSvc := mockadmin.NewMonitoringAndLogsApi(t)
			tc.setup(mockSvc)

			rc, err := FetchHostLogs(ctx, mockSvc, params)

			if tc.wantErr {
				require.Error(t, err)

				if tc.errorType == "NotFoundError" {
					var notFoundErr *internalerrors.NotFoundError
					require.True(t, errors.As(err, &notFoundErr), "expected error to be *errors.NotFoundError")
					assert.Equal(t, "logs", notFoundErr.Resource)
					assert.Equal(t, params.HostName+"/"+params.LogName, notFoundErr.ID)
				} else {
					require.ErrorContains(t, err, "fetch logs", "expected API error")
				}

				require.Nil(t, rc)
				return
			}

			require.NoError(t, err)
			defer fileutils.SafeClose(rc)

			data, err := io.ReadAll(rc)
			require.NoError(t, err)
			require.Equal(t, tc.wantBody, string(data))
		})
	}
}
