// Copyright 2020 MongoDB Inc
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package cli

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/mongodb/mongocli/internal/flag"

	atlas "go.mongodb.org/atlas/mongodbatlas"
)

type MetricsOpts struct {
	ListOpts
	Granularity     string
	Period          string
	Start           string
	End             string
	MeasurementType []string
}

func (opts *MetricsOpts) NewProcessMetricsListOptions() *atlas.ProcessMeasurementListOptions {
	o := &atlas.ProcessMeasurementListOptions{
		ListOptions: opts.NewListOptions(),
	}
	o.Granularity = opts.Granularity
	o.Period = opts.Period
	o.Start = opts.Start
	o.End = opts.End
	o.M = opts.MeasurementType

	return o
}

// ValidatePeriodStartEnd validates period, start and end flags.
func (opts *MetricsOpts) ValidatePeriodStartEnd() error {
	if opts.Period == "" && opts.Start == "" && opts.End == "" {
		return fmt.Errorf("either the --%s flag or the --%s and --%s flags are required", flag.Period, flag.Start, flag.End)
	}
	if opts.Period != "" && (opts.Start != "" || opts.End != "") {
		return fmt.Errorf("the --%s flag is mutually exclusive to the --%s and --%s flags", flag.Period, flag.Start, flag.End)
	}
	if (opts.Start != "" && opts.End == "") || (opts.Start == "" && opts.End != "") {
		return fmt.Errorf("the --%s and --%s flags need to be used together", flag.Start, flag.End)
	}
	return nil
}

// GetHostnameAndPort return the hostname and the port starting from the string hostname:port.
func GetHostnameAndPort(hostInfo string) (hostname string, port int, err error) {
	const hostnameParts = 2
	host := strings.Split(hostInfo, ":")
	if len(host) != hostnameParts {
		return "", 0, fmt.Errorf("expected hostname:port, got %s", host)
	}

	port, err = strconv.Atoi(host[1])
	if err != nil {
		return "", 0, fmt.Errorf("invalid port number, got %s", host[1])
	}

	return host[0], port, nil
}
