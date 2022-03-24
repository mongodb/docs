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

package quickstart

import (
	"context"
	"fmt"
	"os"
	"os/signal"
	"strconv"
	"strings"
	"syscall"
	"time"

	"github.com/AlecAivazis/survey/v2"
	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/mongosh"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/mongodb/mongocli/internal/validate"
	"github.com/pkg/browser"
	"github.com/spf13/cobra"
)

const quickstartTemplate = `
Now you can connect to your Atlas cluster with: mongosh -u %s -p %s %s

`
const quickstartTemplateCloseHandler = `
You can connect to your Atlas cluster with the following user: 
username: %s 
password: %s
`

const quickstartTemplateIntro = `You are creating a new Atlas cluster and enabling access to it.

Press [Enter] to use the default values.

Enter [?] on any option to get help.
`

const quickstartTemplateCluster = `
Creating your cluster... [It's safe to 'Ctrl + C']
`
const quickstartTemplateIPNotFound = `
We could not find your public IP address. To add your IP address run:
  mongocli atlas accesslist create`

const (
	replicaSet          = "REPLICASET"
	defaultAtlasTier    = "M0"
	defaultAtlasGovTier = "M30"
	atlasAdmin          = "atlasAdmin"
	mongoshURL          = "https://www.mongodb.com/try/download/shell"
	atlasAccountURL     = "https://docs.atlas.mongodb.com/tutorial/create-atlas-account/?utm_campaign=atlas_quickstart&utm_source=mongocli&utm_medium=product/"
	profileDocURL       = "https://docs.mongodb.com/mongocli/stable/configure/?utm_campaign=atlas_quickstart&utm_source=mongocli&utm_medium=product#std-label-mcli-configure"
	defaultProvider     = "AWS"
	defaultRegion       = "US_EAST_1"
	defaultRegionGov    = "US_GOV_EAST_1"
)

type Opts struct {
	cli.GlobalOpts
	cli.WatchOpts
	defaultName         string
	ClusterName         string
	tier                string
	Provider            string
	Region              string
	IPAddresses         []string
	IPAddressesResponse string
	DBUsername          string
	DBUserPassword      string
	SampleDataJobID     string
	SkipSampleData      bool
	SkipMongosh         bool
	runMongoShell       bool
	mongoShellInstalled bool
	defaultValue        bool
	Confirm             bool
	store               store.AtlasClusterQuickStarter
}

func (opts *Opts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *Opts) Run() error {
	fmt.Print(quickstartTemplateIntro)

	if err := opts.askClusterOptions(); err != nil {
		return err
	}

	if err := opts.askSampleDataQuestion(); err != nil {
		return err
	}

	if err := opts.createDatabaseUser(); err != nil {
		return err
	}

	if err := opts.createAccessList(); err != nil {
		return err
	}

	if err := opts.askMongoShellQuestion(); err != nil {
		return err
	}

	if err := opts.askConfirmConfigQuestion(); err != nil {
		return err
	}

	fmt.Printf(`We are deploying %s...`, opts.ClusterName)
	if err := opts.createCluster(); err != nil {
		return err
	}

	opts.setupCloseHandler()

	fmt.Print(quickstartTemplateCluster)

	// Watch cluster creation
	if er := opts.Watch(opts.clusterCreationWatcher); er != nil {
		return er
	}

	if err := opts.loadSampleData(); err != nil {
		return err
	}

	// Get cluster's connection string
	cluster, err := opts.store.AtlasCluster(opts.ConfigProjectID(), opts.ClusterName)
	if err != nil {
		return err
	}

	fmt.Printf(quickstartTemplate, opts.DBUsername, opts.DBUserPassword, cluster.ConnectionStrings.StandardSrv)

	if opts.runMongoShell {
		return mongosh.Run(config.MongoShellPath(), opts.DBUsername, opts.DBUserPassword, cluster.ConnectionStrings.StandardSrv)
	}

	return nil
}

func (opts *Opts) loadSampleData() error {
	if opts.SkipSampleData {
		return nil
	}

	fmt.Print(`
Loading sample data into your cluster... [It's safe to 'Ctrl + C']
`)
	sampleDataJob, err := opts.store.AddSampleData(opts.ConfigProjectID(), opts.ClusterName)

	if err != nil {
		return nil
	}

	opts.SampleDataJobID = sampleDataJob.ID

	return opts.Watch(opts.sampleDataWatcher)
}

func (opts *Opts) sampleDataWatcher() (bool, error) {
	result, err := opts.store.SampleDataStatus(opts.ConfigProjectID(), opts.SampleDataJobID)
	if err != nil {
		return false, err
	}
	if result.State == "FAILED" {
		return false, fmt.Errorf("failed to load data: %s", result.ErrorMessage)
	}
	return result.State == "COMPLETED", nil
}

func (opts *Opts) clusterCreationWatcher() (bool, error) {
	result, err := opts.store.AtlasCluster(opts.ConfigProjectID(), opts.ClusterName)
	if err != nil {
		return false, err
	}
	return result.StateName == "IDLE", nil
}

func (opts *Opts) askSampleDataQuestion() error {
	if opts.SkipSampleData {
		return nil
	}

	q := newSampleDataQuestion(opts.ClusterName)
	var addSampleData bool
	if err := survey.AskOne(q, &addSampleData); err != nil {
		return err
	}
	opts.SkipSampleData = !addSampleData

	return nil
}

func askMongoShellAndSetConfig() error {
	var mongoShellPath string
	q := newMongoShellPathInput()
	if err := survey.AskOne(q, &mongoShellPath, survey.WithValidator(validate.Path)); err != nil {
		return err
	}

	config.SetMongoShellPath(mongoShellPath)
	return config.Save()
}

func askAtlasAccountAndProfile() error {
	_, _ = fmt.Fprintln(os.Stderr, "No API credentials set.")

	if err := openBrowserAtlasAccount(); err != nil {
		return err
	}

	if err := openBrowserProfile(); err != nil {
		return err
	}

	return validate.Credentials()
}

func openBrowserProfile() error {
	openBrowserProfileDoc := false
	q := newProfileDocQuestionOpenBrowser()
	if err := survey.AskOne(q, &openBrowserProfileDoc); !openBrowserProfileDoc || err != nil {
		return err
	}

	return browser.OpenURL(profileDocURL)
}

func openBrowserAtlasAccount() error {
	q := newAtlasAccountQuestionOpenBrowser()
	var openBrowserAtlasAccount bool
	if err := survey.AskOne(q, &openBrowserAtlasAccount); !openBrowserAtlasAccount || err != nil {
		return err
	}

	return browser.OpenURL(atlasAccountURL)
}

// setupCloseHandler creates a 'listener' on a new goroutine which will notify the
// program if it receives an interrupt from the OS. We then handle this by printing
// the dbUsername and dbPassword.
func (opts *Opts) setupCloseHandler() {
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)
	go func() {
		<-c
		fmt.Printf(quickstartTemplateCloseHandler, opts.DBUsername, opts.DBUserPassword)
		os.Exit(0)
	}()
}

func (opts *Opts) providerAndRegionToConstant() {
	opts.Provider = strings.ToUpper(opts.Provider)
	opts.Region = strings.ReplaceAll(strings.ToUpper(opts.Region), "-", "_")
}

func (opts *Opts) setTier() {
	if config.CloudGovService == config.Service() && opts.tier == defaultAtlasTier {
		opts.tier = defaultAtlasGovTier
	}
}

func (opts *Opts) defaultValues() error {
	if !opts.defaultValue {
		return nil
	}

	opts.SkipSampleData = true
	opts.SkipMongosh = true

	if opts.ClusterName == "" {
		opts.ClusterName = opts.defaultName
	}

	if opts.Provider == "" {
		opts.Provider = defaultProvider
	}

	if opts.Region == "" {
		opts.Region = defaultRegion
		if config.CloudGovService == config.Service() {
			opts.Region = defaultRegionGov
		}
	}

	if opts.DBUsername == "" {
		opts.DBUsername = opts.defaultName
	}

	if opts.DBUserPassword == "" {
		pwd, err := generatePassword()
		if err != nil {
			return err
		}
		opts.DBUserPassword = pwd
	}

	if len(opts.IPAddresses) == 0 {
		if publicIP := store.IPAddress(); publicIP != "" {
			opts.IPAddresses = []string{publicIP}
		} else {
			_, _ = fmt.Fprintln(os.Stderr, quickstartTemplateIPNotFound)
		}
	}

	return nil
}

// Builder
// mongocli atlas dbuser(s) quickstart
//	[--clusterName clusterName]
//	[--provider provider]
//	[--region regionName]
//	[--projectId projectId]
//	[--username username]
//	[--password password]
//	[--skipMongosh skipMongosh]
//	[--default]
func Builder() *cobra.Command {
	opts := &Opts{}
	cmd := &cobra.Command{
		Use: "quickstart",
		Example: `Skip setting cluster name, provider or database username by using the command options
  $ mongocli atlas quickstart --clusterName Test --provider GCP --username dbuserTest
`,
		Short: "Create and access an Atlas Cluster.",
		Long:  "This command creates a new cluster, adds your public IP to the atlas access list and creates a db user to access your new MongoDB instance.",
		PreRunE: func(cmd *cobra.Command, args []string) error {
			if config.PublicAPIKey() == "" || config.PrivateAPIKey() == "" {
				// no profile set
				return askAtlasAccountAndProfile()
			}
			opts.setTier()
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), ""),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			const base10 = 10
			opts.defaultName = "Quickstart-" + strconv.FormatInt(time.Now().Unix(), base10)
			opts.providerAndRegionToConstant()

			if err := opts.defaultValues(); err != nil {
				return err
			}
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.ClusterName, flag.ClusterName, "", usage.ClusterName)
	cmd.Flags().StringVar(&opts.tier, flag.Tier, defaultAtlasTier, usage.Tier)
	cmd.Flags().StringVar(&opts.Provider, flag.Provider, "", usage.Provider)
	cmd.Flags().StringVarP(&opts.Region, flag.Region, flag.RegionShort, "", usage.Region)
	cmd.Flags().StringSliceVar(&opts.IPAddresses, flag.AccessListIP, []string{}, usage.NetworkAccessListIPEntry)
	cmd.Flags().StringVar(&opts.DBUsername, flag.Username, "", usage.DBUsername)
	cmd.Flags().StringVar(&opts.DBUserPassword, flag.Password, "", usage.Password)
	cmd.Flags().BoolVar(&opts.SkipSampleData, flag.SkipSampleData, false, usage.SkipSampleData)
	cmd.Flags().BoolVar(&opts.SkipMongosh, flag.SkipMongosh, false, usage.SkipMongosh)
	cmd.Flags().BoolVarP(&opts.defaultValue, flag.Default, "Y", false, usage.QuickstartDefault)
	cmd.Flags().BoolVar(&opts.Confirm, flag.Force, false, usage.Force)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)

	return cmd
}
