.. _atlas-api-dataLakePipelines:

===========================
atlas api dataLakePipelines
===========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, edits, and removes Atlas Data Lake Pipelines and associated runs.

Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - -h, --help
     - 
     - false
     - help for dataLakePipelines

Inherited Options
-----------------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - -P, --profile
     - string
     - false
     - Name of the profile to use from your configuration file. To learn about profiles for the Atlas CLI, see https://dochub.mongodb.org/core/atlas-cli-save-connection-settings.

Related Commands
----------------

* :ref:`atlas-api-dataLakePipelines-createPipeline` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates one Data Lake Pipeline.
* :ref:`atlas-api-dataLakePipelines-deletePipeline` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes one Data Lake Pipeline.
* :ref:`atlas-api-dataLakePipelines-deletePipelineRunDataset` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Deletes dataset that Atlas generated during the specified pipeline run.
* :ref:`atlas-api-dataLakePipelines-getPipeline` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the details of one Data Lake Pipeline within the specified project.
* :ref:`atlas-api-dataLakePipelines-getPipelineRun` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the details of one Data Lake Pipeline run within the specified project.
* :ref:`atlas-api-dataLakePipelines-listPipelineRuns` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns a list of past Data Lake Pipeline runs.
* :ref:`atlas-api-dataLakePipelines-listPipelineSchedules` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns a list of backup schedule policy items that you can use as a Data Lake Pipeline source.
* :ref:`atlas-api-dataLakePipelines-listPipelineSnapshots` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns a list of backup snapshots that you can use to trigger an on demand pipeline run.
* :ref:`atlas-api-dataLakePipelines-listPipelines` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns a list of Data Lake Pipelines.
* :ref:`atlas-api-dataLakePipelines-pausePipeline` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Pauses ingestion for a Data Lake Pipeline within the specified project.
* :ref:`atlas-api-dataLakePipelines-resumePipeline` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Resumes ingestion for a Data Lake Pipeline within the specified project.
* :ref:`atlas-api-dataLakePipelines-triggerSnapshotIngestion` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Triggers a Data Lake Pipeline ingestion of a specified snapshot.
* :ref:`atlas-api-dataLakePipelines-updatePipeline` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates one Data Lake Pipeline.


.. toctree::
   :titlesonly:

   createPipeline </command/atlas-api-dataLakePipelines-createPipeline>
   deletePipeline </command/atlas-api-dataLakePipelines-deletePipeline>
   deletePipelineRunDataset </command/atlas-api-dataLakePipelines-deletePipelineRunDataset>
   getPipeline </command/atlas-api-dataLakePipelines-getPipeline>
   getPipelineRun </command/atlas-api-dataLakePipelines-getPipelineRun>
   listPipelineRuns </command/atlas-api-dataLakePipelines-listPipelineRuns>
   listPipelineSchedules </command/atlas-api-dataLakePipelines-listPipelineSchedules>
   listPipelineSnapshots </command/atlas-api-dataLakePipelines-listPipelineSnapshots>
   listPipelines </command/atlas-api-dataLakePipelines-listPipelines>
   pausePipeline </command/atlas-api-dataLakePipelines-pausePipeline>
   resumePipeline </command/atlas-api-dataLakePipelines-resumePipeline>
   triggerSnapshotIngestion </command/atlas-api-dataLakePipelines-triggerSnapshotIngestion>
   updatePipeline </command/atlas-api-dataLakePipelines-updatePipeline>

