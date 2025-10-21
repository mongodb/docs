.. code-block:: json
   :linenos:

   {
    "annotations": {
      "list": [
        {
          "builtIn": 1,
          "datasource": "-- Grafana --",
          "enable": true,
          "hide": true,
          "iconColor": "rgba(0, 211, 255, 1)",
          "name": "Annotations & Alerts",
          "target": {
            "limit": 100,
            "matchAny": false,
            "tags": [],
            "type": "dashboard"
          },
          "type": "dashboard"
        }
      ]
    },
    "description": "",
    "editable": true,
    "fiscalYearStartMonth": 0,
    "gnetId": null,
    "graphTooltip": 0,
    "id": 8,
    "iteration": 1639495636182,
    "links": [],
    "liveNow": false,
    "panels": [
      {
        "collapsed": false,
        "datasource": null,
        "gridPos": {
          "h": 1,
          "w": 24,
          "x": 0,
          "y": 0
        },
        "id": 10,
        "panels": [],
        "title": "Overview",
        "type": "row"
      },
      {
        "datasource": null,
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "thresholds"
            },
            "custom": {
              "align": "auto",
              "displayMode": "color-text",
              "filterable": false
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            }
          },
          "overrides": [
            {
              "matcher": {
                "id": "byName",
                "options": "instance"
              },
              "properties": [
                {
                  "id": "custom.width",
                  "value": 409
                }
              ]
            }
          ]
        },
        "gridPos": {
          "h": 3,
          "w": 11,
          "x": 0,
          "y": 1
        },
        "id": 41,
        "options": {
          "frameIndex": 0,
          "showHeader": true,
          "sortBy": [
            {
              "desc": true,
              "displayName": "Value #A"
            }
          ]
        },
        "pluginVersion": "8.2.2",
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(mongodb_up{group_id=~\"$group_id\",  instance=~\"$host.*\"}) by (group_name, group_id, org_id, replica_set_name, cluster_name), \"hostname\", \"$1\", \"instance\", \"(.*):.*\")\n",
            "format": "table",
            "interval": "",
            "legendFormat": "",
            "refId": "A"
          }
        ],
        "title": "Group Metadata",
        "transformations": [
          {
            "id": "organize",
            "options": {
              "excludeByName": {
                "Time": true,
                "Value #A": true,
                "instance": true,
                "replica_set_name": false
              },
              "indexByName": {
                "Time": 0,
                "Value #A": 6,
                "cluster_name": 4,
                "group_id": 3,
                "group_name": 2,
                "org_id": 1,
                "replica_set_name": 5
              },
              "renameByName": {
                "Time": "",
                "cluster_name": "Cluster Name",
                "group_id": "Group Id",
                "group_name": "Group Name ",
                "hostname": "Host",
                "instance": "",
                "org_id": "Org Id",
                "process_port": "Port",
                "replica_set_name": "ReplicaSet Name",
                "replica_state": "ReplicaSet State"
              }
            }
          },
          {
            "id": "groupBy",
            "options": {
              "fields": {
                "Cluster Name": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "Group Id": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "Group Name ": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "Host": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "Host ": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "Org Id": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "Port": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "Replica set state": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "ReplicaSet Name": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "ReplicaSet State": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "host ": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "hostname": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "instance": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "port": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "process_port": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "replica set": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "replica set state": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "replica_set_name": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "replica_state": {
                  "aggregations": [],
                  "operation": "groupby"
                }
              }
            }
          }
        ],
        "type": "table"
      },
      {
        "datasource": null,
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "thresholds"
            },
            "custom": {
              "align": "auto",
              "displayMode": "color-text",
              "filterable": false
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            }
          },
          "overrides": [
            {
              "matcher": {
                "id": "byName",
                "options": "instance"
              },
              "properties": [
                {
                  "id": "custom.width",
                  "value": 409
                }
              ]
            },
            {
              "matcher": {
                "id": "byName",
                "options": "Port"
              },
              "properties": [
                {
                  "id": "custom.width",
                  "value": 80
                }
              ]
            },
            {
              "matcher": {
                "id": "byName",
                "options": "ReplicaSet State"
              },
              "properties": [
                {
                  "id": "custom.width",
                  "value": 135
                }
              ]
            },
            {
              "matcher": {
                "id": "byName",
                "options": "ReplicaSet Name"
              },
              "properties": [
                {
                  "id": "custom.width",
                  "value": 198
                }
              ]
            },
            {
              "matcher": {
                "id": "byName",
                "options": "Host"
              },
              "properties": [
                {
                  "id": "custom.width",
                  "value": 356
                }
              ]
            }
          ]
        },
        "gridPos": {
          "h": 5,
          "w": 13,
          "x": 11,
          "y": 1
        },
        "id": 42,
        "options": {
          "frameIndex": 0,
          "showHeader": true,
          "sortBy": []
        },
        "pluginVersion": "8.2.2",
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(mongodb_up{group_id=~\"$group_id\",  instance=~\"$host.*\"}) by (instance, replica_state, process_port, replica_set_name, process_type), \"hostname\", \"$1\", \"instance\", \"(.*):.*\")\n",
            "format": "table",
            "interval": "",
            "legendFormat": "",
            "refId": "A"
          }
        ],
        "title": "Cluster host list",
        "transformations": [
          {
            "id": "organize",
            "options": {
              "excludeByName": {
                "Time": true,
                "Value #A": true,
                "instance": true,
                "process_type": false,
                "replica_set_name": false
              },
              "indexByName": {
                "Time": 0,
                "Value #A": 6,
                "hostname": 1,
                "instance": 2,
                "process_port": 3,
                "replica_set_name": 5,
                "replica_state": 4
              },
              "renameByName": {
                "Time": "",
                "hostname": "Host",
                "instance": "",
                "process_port": "Port",
                "process_type": "Type",
                "replica_set_name": "ReplicaSet Name",
                "replica_state": "ReplicaSet State"
              }
            }
          },
          {
            "id": "groupBy",
            "options": {
              "fields": {
                "Host": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "Host ": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "Port": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "Replica set state": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "ReplicaSet Name": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "ReplicaSet State": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "Type": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "host ": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "hostname": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "instance": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "port": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "process_port": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "process_type": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "replica set": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "replica set state": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "replica_set_name": {
                  "aggregations": [],
                  "operation": "groupby"
                },
                "replica_state": {
                  "aggregations": [],
                  "operation": "groupby"
                }
              }
            }
          }
        ],
        "type": "table"
      },
      {
        "collapsed": false,
        "datasource": null,
        "gridPos": {
          "h": 1,
          "w": 24,
          "x": 0,
          "y": 6
        },
        "id": 8,
        "panels": [],
        "title": "System Memory",
        "type": "row"
      },
      {
        "datasource": null,
        "description": "The number of kilobytes of used shared memory (shared between several processes, thus including RAM disks, SYS-V-IPC and BSD like SHMEM)",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "deckbytes"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 8,
          "w": 6,
          "x": 0,
          "y": 7
        },
        "id": 2,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace(sum(hardware_system_memory_shared_mem_kilobytes{group_id=~\"$group_id\",  instance=~\"$host.*\"}) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}}",
            "refId": "A"
          }
        ],
        "title": "System Memory - Shared",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The number of kilobytes of buffer cache, relatively temporary storage for raw disk blocks",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "deckbytes"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 8,
          "w": 6,
          "x": 6,
          "y": 7
        },
        "id": 6,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(hardware_system_memory_buffers_kilobytes{group_id=~\"$group_id\",  instance=~\"$host.*\"}) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}}",
            "refId": "A"
          }
        ],
        "title": "System Memory - Buffers",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The number of kilobytes in the page cache.",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "deckbytes"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 8,
          "w": 6,
          "x": 12,
          "y": 7
        },
        "id": 11,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace (sum(hardware_system_memory_cached_kilobytes{group_id=~\"$group_id\",  instance=~\"$host.*\"}) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}}",
            "refId": "A"
          }
        ],
        "title": "System Memory - Cached",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The number of kilobytes of physical memory in use\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "deckbytes"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 8,
          "w": 6,
          "x": 0,
          "y": 15
        },
        "id": 13,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(hardware_system_memory_mem_total_kilobytes{group_id=~\"$group_id\",  instance=~\"$host.*\"}) by (instance) - sum(hardware_system_memory_mem_free_kilobytes{group_id=~\"$group_id\",  instance=~\"$host.*\"}) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}}",
            "refId": "A"
          }
        ],
        "title": "System Memory - Used",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The total amount of swap space in free and used, measured in kilobytes\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "deckbytes"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 8,
          "w": 6,
          "x": 6,
          "y": 15
        },
        "id": 37,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(hardware_system_memory_swap_total_kilobytes{group_id=~\"$group_id\",  instance=~\"$host.*\"}) by (instance) - sum(hardware_system_memory_swap_free_kilobytes{group_id=~\"$group_id\",  instance=~\"$host.*\"}) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "swap used for host - {{hostname}}",
            "refId": "A"
          },
          {
            "exemplar": true,
            "expr": "label_replace (sum(hardware_system_memory_swap_free_kilobytes{group_id=~\"$group_id\",  instance=~\"$host.*\"}) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "hide": false,
            "interval": "",
            "legendFormat": "swap free for host - {{hostname}}",
            "refId": "B"
          }
        ],
        "title": "System Memory - Swap",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "An estimate of the number of kilobytes of system memory available for running new applications, without swapping",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "deckbytes"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 8,
          "w": 6,
          "x": 12,
          "y": 15
        },
        "id": 15,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(hardware_system_memory_mem_available_kilobytes{group_id=~\"$group_id\",  instance=~\"$host.*\"}) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}}",
            "refId": "A"
          }
        ],
        "title": "System Memory - Available",
        "type": "timeseries"
      },
      {
        "collapsed": false,
        "datasource": null,
        "gridPos": {
          "h": 1,
          "w": 24,
          "x": 0,
          "y": 23
        },
        "id": 17,
        "panels": [],
        "title": "System CPU",
        "type": "row"
      },
      {
        "datasource": null,
        "description": "The percentage of time the CPU had something runnable, but the hypervisor chose to run something else. For servers with more than 1 CPU core, this value can exceed 100%.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "percent"
          },
          "overrides": [
            {
              "__systemRef": "hideSeriesFrom",
              "matcher": {
                "id": "byNames",
                "options": {
                  "mode": "exclude",
                  "names": [
                    "host - banana-shard-00-01.faplr.mmscloudteam.com"
                  ],
                  "prefix": "All except:",
                  "readOnly": true
                }
              },
              "properties": [
                {
                  "id": "custom.hideFrom",
                  "value": {
                    "legend": false,
                    "tooltip": false,
                    "viz": true
                  }
                }
              ]
            }
          ]
        },
        "gridPos": {
          "h": 7,
          "w": 5,
          "x": 0,
          "y": 24
        },
        "id": 19,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(rate(hardware_system_cpu_steal_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval]) / 10) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}}",
            "refId": "A"
          }
        ],
        "title": "System cpu - steal",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The percentage of time the CPU spent servicing guest, which is included in user. For servers with more than 1 CPU core, this value can exceed 100%.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "percent"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 7,
          "w": 5,
          "x": 5,
          "y": 24
        },
        "id": 20,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(rate(hardware_system_cpu_guest_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval]) / 10) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}}",
            "refId": "A"
          }
        ],
        "title": "System cpu - guest",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The percentage of time the CPU spent performing software interrupts. For servers with more than 1 CPU core, this value can exceed 100%.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "percent"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 7,
          "w": 5,
          "x": 10,
          "y": 24
        },
        "id": 21,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(rate(hardware_system_cpu_soft_irq_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval]) / 10) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}}",
            "refId": "A"
          }
        ],
        "title": "System cpu - softirq",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The percentage of time the CPU spent performing hardware interrupts. For servers with more than 1 CPU core, this value can exceed 100%.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "percent"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 7,
          "w": 5,
          "x": 15,
          "y": 24
        },
        "id": 22,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(rate(hardware_system_cpu_irq_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval]) / 10) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}}",
            "refId": "A"
          }
        ],
        "title": "System cpu - irq",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The percentage of time the CPU spent waiting for IO operations to complete. For servers with more than 1 CPU core, this value can exceed 100%\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "percent"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 7,
          "w": 5,
          "x": 0,
          "y": 31
        },
        "id": 23,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace(sum(rate(hardware_system_cpu_io_wait_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval]) / 10) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}}",
            "refId": "A"
          }
        ],
        "title": "System cpu - iowait",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The percentage of time the CPU spent occupied by all processes with a positive nice value. For servers with more than 1 CPU core, this value can exceed 100%.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "percent"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 7,
          "w": 5,
          "x": 5,
          "y": 31
        },
        "id": 24,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(rate(hardware_system_cpu_nice_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval]) / 10) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}}",
            "refId": "A"
          }
        ],
        "title": "System cpu - nice",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The percentage of time the CPU spent servicing operating system calls from all processes. For servers with more than 1 CPU core, this value can exceed 100%.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "percent"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 7,
          "w": 5,
          "x": 10,
          "y": 31
        },
        "id": 25,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(rate(hardware_system_cpu_kernel_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval]) / 10) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}}",
            "refId": "A"
          }
        ],
        "title": "System cpu - kernel",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The percentage of time the CPU spent servicing all user applications (not just MongoDB processes). For servers with more than 1 CPU core, this value can exceed 100%.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "percent"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 7,
          "w": 5,
          "x": 15,
          "y": 31
        },
        "id": 26,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(rate(hardware_system_cpu_user_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval]) / 10) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}}",
            "refId": "A"
          }
        ],
        "title": "System cpu - user",
        "type": "timeseries"
      },
      {
        "collapsed": false,
        "datasource": null,
        "gridPos": {
          "h": 1,
          "w": 24,
          "x": 0,
          "y": 38
        },
        "id": 44,
        "panels": [],
        "title": "Normalized System Cpu",
        "type": "row"
      },
      {
        "datasource": null,
        "description": "The percentage of time the CPU had something runnable, but the hypervisor chose to run something else. It is scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "percent"
          },
          "overrides": [
            {
              "__systemRef": "hideSeriesFrom",
              "matcher": {
                "id": "byNames",
                "options": {
                  "mode": "exclude",
                  "names": [
                    "host - banana-shard-00-01.faplr.mmscloudteam.com"
                  ],
                  "prefix": "All except:",
                  "readOnly": true
                }
              },
              "properties": [
                {
                  "id": "custom.hideFrom",
                  "value": {
                    "legend": false,
                    "tooltip": false,
                    "viz": true
                  }
                }
              ]
            }
          ]
        },
        "gridPos": {
          "h": 7,
          "w": 5,
          "x": 0,
          "y": 39
        },
        "id": 46,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(rate(hardware_system_cpu_steal_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval]) / (10 * hardware_platform_num_logical_cpus{group_id=~\"$group_id\",  instance=~\"$host.*\"})) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}}",
            "refId": "A"
          }
        ],
        "title": "Normalized System cpu - steal",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The percentage of time the CPU spent servicing guest, which is included in user. It is scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "percent"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 7,
          "w": 5,
          "x": 5,
          "y": 39
        },
        "id": 47,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(rate(hardware_system_cpu_guest_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval]) / (10 * hardware_platform_num_logical_cpus{group_id=~\"$group_id\",  instance=~\"$host.*\"})) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}}",
            "refId": "A"
          }
        ],
        "title": "Normalized System cpu - guest",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The percentage of time the CPU spent performing software interrupts. It is scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "percent"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 7,
          "w": 5,
          "x": 10,
          "y": 39
        },
        "id": 48,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(rate(hardware_system_cpu_soft_irq_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval]) / (10 * hardware_platform_num_logical_cpus{group_id=~\"$group_id\",  instance=~\"$host.*\"})) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}}",
            "refId": "A"
          }
        ],
        "title": "Normalized System cpu - softirq",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The percentage of time the CPU spent performing hardware interrupts. It is scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "percent"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 7,
          "w": 5,
          "x": 15,
          "y": 39
        },
        "id": 49,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(rate(hardware_system_cpu_irq_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval]) / (10 * hardware_platform_num_logical_cpus{group_id=~\"$group_id\",  instance=~\"$host.*\"})) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}}",
            "refId": "A"
          }
        ],
        "title": "Normalized System cpu - irq",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The percentage of time the CPU spent waiting for IO operations to complete. It is scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "percent"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 7,
          "w": 5,
          "x": 0,
          "y": 46
        },
        "id": 51,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace(sum(rate(hardware_system_cpu_io_wait_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval]) / (10 * hardware_platform_num_logical_cpus{group_id=~\"$group_id\",  instance=~\"$host.*\"})) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}}",
            "refId": "A"
          }
        ],
        "title": "Normalized System cpu - iowait",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The percentage of time the CPU spent occupied by all processes with a positive nice value. It is scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "percent"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 7,
          "w": 5,
          "x": 5,
          "y": 46
        },
        "id": 52,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(rate(hardware_system_cpu_nice_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval]) / (10 * hardware_platform_num_logical_cpus{group_id=~\"$group_id\",  instance=~\"$host.*\"})) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}}",
            "refId": "A"
          }
        ],
        "title": "Normalized System cpu - nice",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The percentage of time the CPU spent servicing operating system calls from all processes. It is scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "percent"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 7,
          "w": 5,
          "x": 10,
          "y": 46
        },
        "id": 53,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(rate(hardware_system_cpu_kernel_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval]) / (10 * hardware_platform_num_logical_cpus{group_id=~\"$group_id\",  instance=~\"$host.*\"})) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}}",
            "refId": "A"
          }
        ],
        "title": "Normalized System cpu - kernel",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The percentage of time the CPU spent servicing all user applications (not just MongoDB processes). It is scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "percent"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 7,
          "w": 5,
          "x": 15,
          "y": 46
        },
        "id": 50,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(rate(hardware_system_cpu_user_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval]) / (10 * hardware_platform_num_logical_cpus{group_id=~\"$group_id\",  instance=~\"$host.*\"})) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}}",
            "refId": "A"
          }
        ],
        "title": "Normalized System cpu - user",
        "type": "timeseries"
      },
      {
        "collapsed": false,
        "datasource": null,
        "gridPos": {
          "h": 1,
          "w": 24,
          "x": 0,
          "y": 53
        },
        "id": 28,
        "panels": [],
        "title": "System Network",
        "type": "row"
      },
      {
        "datasource": null,
        "description": "The average rate of physical bytes received per second by the eth0 network interface\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "Bps"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 9,
          "w": 10,
          "x": 0,
          "y": 54
        },
        "id": 73,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(rate(hardware_system_network_eth0_bytes_in_bytes{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval])) by (instance) + sum(rate(hardware_system_network_lo_bytes_in_bytes{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval])) by (instance), \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}}",
            "refId": "A"
          }
        ],
        "title": "Network bytes In",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The average rate of physical bytes transmitted per second by the eth0 network interface",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "Bps"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 9,
          "w": 10,
          "x": 10,
          "y": 54
        },
        "id": 74,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(rate(hardware_system_network_eth0_bytes_out_bytes{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval])) by (instance) + sum(rate(hardware_system_network_lo_bytes_out_bytes{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval])) by (instance), \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}}",
            "refId": "A"
          }
        ],
        "title": "Network bytes Out",
        "type": "timeseries"
      },
      {
        "collapsed": false,
        "datasource": null,
        "gridPos": {
          "h": 1,
          "w": 24,
          "x": 0,
          "y": 63
        },
        "id": 30,
        "panels": [],
        "title": "System Disk",
        "type": "row"
      },
      {
        "datasource": null,
        "description": "The total bytes of free disk space on the disk partition used by MongoDB.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "decbytes"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 8,
          "w": 6,
          "x": 0,
          "y": 64
        },
        "id": 14,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(hardware_disk_metrics_disk_space_free_bytes{group_id=~\"$group_id\",  instance=~\"$host.*\"}) by (instance, disk_name) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "disk - {{disk_name}}, host - {{hostname}} ",
            "refId": "A"
          }
        ],
        "title": "System Disk - Free",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The percent of free disk space on the partition used by MongoDB.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "percent"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 8,
          "w": 6,
          "x": 6,
          "y": 64
        },
        "id": 71,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(hardware_disk_metrics_disk_space_free_bytes{group_id=~\"$group_id\",  instance=~\"$host.*\"} / (hardware_disk_metrics_disk_space_used_bytes{group_id=~\"$group_id\",  instance=~\"$host.*\"} + hardware_disk_metrics_disk_space_free_bytes{group_id=~\"$group_id\",  instance=~\"$host.*\"}) * 100) by (instance, disk_name) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "disk - {{disk_name}}, host - {{hostname}} ",
            "refId": "A"
          }
        ],
        "title": "System Disk Percent Free",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The total bytes of used disk space on the partition that runs MongoDB.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "decbytes"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 8,
          "w": 6,
          "x": 12,
          "y": 64
        },
        "id": 36,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(hardware_disk_metrics_disk_space_used_bytes{group_id=~\"$group_id\",  instance=~\"$host.*\"}) by (instance, disk_name) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "disk - {{disk_name}} host - {{hostname}} ",
            "refId": "A"
          }
        ],
        "title": "System Disk - Used",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The write throughput of I/O operations per second for the disk partition used for MongoDB.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "/ sec"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 8,
          "w": 6,
          "x": 18,
          "y": 64
        },
        "id": 63,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(rate(hardware_disk_metrics_write_count{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval])) by (instance, disk_name) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "hide": false,
            "interval": "",
            "legendFormat": "disk - {{disk_name}} host - {{hostname}} ",
            "refId": "B"
          }
        ],
        "title": "System Disk Write IOPS",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The write latency in milliseconds of the disk partition used by MongoDB.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "ms"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 8,
          "w": 6,
          "x": 0,
          "y": 72
        },
        "id": 64,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(rate(hardware_disk_metrics_write_time_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval]) / rate(hardware_disk_metrics_write_count{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval])) by (instance, disk_name), \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "hide": false,
            "interval": "",
            "legendFormat": "disk - {{disk_name}} host - {{hostname}} ",
            "refId": "B"
          }
        ],
        "title": "System Disk Write Latency",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The Read latency in milliseconds of the disk partition used by MongoDB.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "ms"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 8,
          "w": 6,
          "x": 6,
          "y": 72
        },
        "id": 65,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(rate(hardware_disk_metrics_read_time_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval]) / rate(hardware_disk_metrics_read_count{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval])) by (instance, disk_name), \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "hide": false,
            "interval": "",
            "legendFormat": "disk - {{disk_name}} host - {{hostname}} ",
            "refId": "B"
          }
        ],
        "title": "System Disk Read Latency",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The read throughput of I/O operations per second for the disk partition used for MongoDB.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "/ sec"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 8,
          "w": 6,
          "x": 12,
          "y": 72
        },
        "id": 62,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(rate(hardware_disk_metrics_read_count{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval])) by (instance, disk_name) , \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "disk - {{disk_name}} host - {{hostname}} ",
            "refId": "A"
          }
        ],
        "title": "System Disk Read IOPS",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The percentage of time during which requests are being issued to and serviced by the partition. This includes requests from any process, not just MongoDB processes.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "percent"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 8,
          "w": 6,
          "x": 18,
          "y": 72
        },
        "id": 67,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(rate(hardware_disk_metrics_total_time_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval]) ) by (instance, disk_name) / 10, \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "hide": false,
            "interval": "",
            "legendFormat": "disk - {{disk_name}} host - {{hostname}} ",
            "refId": "B"
          }
        ],
        "title": "System Disk Util %",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The average length of queue of requests issued to the disk partition used by MongoDB.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "ms"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 8,
          "w": 6,
          "x": 0,
          "y": 80
        },
        "id": 66,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace( sum(rate(hardware_disk_metrics_weighted_time_io_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\"}[$interval]) ) by (instance, DiskName), \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "hide": false,
            "interval": "",
            "legendFormat": "disk - {{disk_name}} host - {{hostname}} ",
            "refId": "B"
          }
        ],
        "title": "System Disk Queue Depth",
        "type": "timeseries"
      },
      {
        "collapsed": false,
        "datasource": null,
        "gridPos": {
          "h": 1,
          "w": 24,
          "x": 0,
          "y": 88
        },
        "id": 32,
        "panels": [],
        "title": "Process CPU",
        "type": "row"
      },
      {
        "datasource": null,
        "description": "The percentage of time the CPU spent servicing this MongoDB process, scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "percent"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 7,
          "w": 6,
          "x": 0,
          "y": 89
        },
        "id": 54,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace((sum(rate(hardware_process_cpu_user_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\", process_port=~\"$process_port\" } [$interval])) by (instance, process_port)  / on(instance) group_left  hardware_platform_num_logical_cpus{group_id=~\"$group_id\",  instance=~\"$host.*\" })/10, \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}} port - {{process_port}}",
            "refId": "A"
          }
        ],
        "title": "Normalized Process cpu - user",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "percent"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 7,
          "w": 6,
          "x": 6,
          "y": 89
        },
        "id": 58,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace((sum(rate(hardware_process_cpu_children_user_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\", process_port=~\"$process_port\" } [$interval])) by (instance, process_port)  / on(instance) group_left  hardware_platform_num_logical_cpus{group_id=~\"$group_id\",  instance=~\"$host.*\" })/10, \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}} port - {{process_port}}",
            "refId": "A"
          }
        ],
        "title": "Normalized Process cpu - children user",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The percentage of time the CPU spent servicing operating system calls for this MongoDB process, scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "percent"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 7,
          "w": 6,
          "x": 12,
          "y": 89
        },
        "id": 55,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace((sum(rate(hardware_process_cpu_kernel_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\", process_port=~\"$process_port\" } [$interval])) by (instance, process_port)  / on(instance) group_left  hardware_platform_num_logical_cpus{group_id=~\"$group_id\",  instance=~\"$host.*\" })/10, \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}} port - {{process_port}}",
            "refId": "A"
          }
        ],
        "title": "Normalized Process cpu - kernel",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "percent"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 7,
          "w": 6,
          "x": 18,
          "y": 89
        },
        "id": 57,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace((sum(rate(hardware_process_cpu_children_kernel_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\", process_port=~\"$process_port\" } [$interval])) by (instance, process_port)  / on(instance) group_left  hardware_platform_num_logical_cpus{group_id=~\"$group_id\",  instance=~\"$host.*\" })/10, \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}} port - {{process_port}}",
            "refId": "A"
          }
        ],
        "title": "Normalized Process cpu - children kernel",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The percentage of time the CPU spent servicing this MongoDB process. For servers with more than 1 CPU core, this value can exceed 100%.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "percent"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 7,
          "w": 6,
          "x": 0,
          "y": 96
        },
        "id": 56,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace(sum(rate(hardware_process_cpu_user_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\", process_port=~\"$process_port\" } [$interval])) by (instance, process_port)  / 10, \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}} port - {{process_port}}",
            "refId": "A"
          }
        ],
        "title": "Process cpu - user",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "percent"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 7,
          "w": 6,
          "x": 6,
          "y": 96
        },
        "id": 59,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace(sum(rate(hardware_process_cpu_children_user_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\", process_port=~\"$process_port\" } [$interval])) by (instance, process_port)  / 10, \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}} port - {{process_port}}",
            "refId": "A"
          }
        ],
        "title": "Process cpu - child user",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "The percentage of time the CPU spent servicing operating system calls for this MongoDB process. For servers with more than 1 CPU core, this value can exceed 100%.\n",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "percent"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 7,
          "w": 6,
          "x": 12,
          "y": 96
        },
        "id": 60,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace(sum(rate(hardware_process_cpu_kernel_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\", process_port=~\"$process_port\" } [$interval])) by (instance, process_port)  / 10, \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}} port - {{process_port}}",
            "refId": "A"
          }
        ],
        "title": "Process cpu - kernel",
        "type": "timeseries"
      },
      {
        "datasource": null,
        "description": "",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "percent"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 7,
          "w": 6,
          "x": 18,
          "y": 96
        },
        "id": 61,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom"
          },
          "tooltip": {
            "mode": "single"
          }
        },
        "targets": [
          {
            "exemplar": true,
            "expr": "label_replace(sum(rate(hardware_process_cpu_children_kernel_milliseconds{group_id=~\"$group_id\",  instance=~\"$host.*\", process_port=~\"$process_port\" } [$interval])) by (instance, process_port)  / 10, \"hostname\", \"$1\", \"instance\", \"(.*):.*\")",
            "interval": "",
            "legendFormat": "host - {{hostname}} port - {{process_port}}",
            "refId": "A"
          }
        ],
        "title": "Process cpu - children kernel",
        "type": "timeseries"
      }
    ],
    "refresh": false,
    "schemaVersion": 31,
    "style": "dark",
    "tags": [],
    "templating": {
      "list": [
        {
          "current": {
            "selected": false,
            "text": "Prometheus",
            "value": "Prometheus"
          },
          "description": null,
          "error": null,
          "hide": 0,
          "includeAll": false,
          "label": null,
          "multi": false,
          "name": "Datasource",
          "options": [],
          "query": "prometheus",
          "queryValue": "",
          "refresh": 1,
          "regex": "",
          "skipUrlSync": false,
          "type": "datasource"
        },
        {
          "allValue": null,
          "current": {
            "selected": false,
            "text": "611c15fc5851c22d37e3f351",
            "value": "611c15fc5851c22d37e3f351"
          },
          "datasource": null,
          "definition": "label_values(group_id)",
          "description": null,
          "error": null,
          "hide": 0,
          "includeAll": false,
          "label": "Group Id",
          "multi": false,
          "name": "group_id",
          "options": [],
          "query": {
            "query": "label_values(group_id)",
            "refId": "StandardVariableQuery"
          },
          "refresh": 1,
          "regex": "",
          "skipUrlSync": false,
          "sort": 0,
          "type": "query"
        },
        {
          "allValue": null,
          "current": {
            "selected": false,
            "text": "Cluster0",
            "value": "Cluster0"
          },
          "datasource": null,
          "definition": "label_values(mongodb_up{group_id='$group_id'}, cluster_name)",
          "description": null,
          "error": null,
          "hide": 0,
          "includeAll": false,
          "label": "Cluster Name",
          "multi": false,
          "name": "cluster_name",
          "options": [],
          "query": {
            "query": "label_values(mongodb_up{group_id='$group_id'}, cluster_name)",
            "refId": "StandardVariableQuery"
          },
          "refresh": 2,
          "regex": "",
          "skipUrlSync": false,
          "sort": 0,
          "type": "query"
        },
        {
          "allValue": null,
          "current": {
            "selected": true,
            "text": [
              "All"
            ],
            "value": [
              "$__all"
            ]
          },
          "datasource": null,
          "definition": "label_values(mongodb_up{group_id='$group_id', cluster_name='$cluster_name'}, replica_set_name)",
          "description": null,
          "error": null,
          "hide": 0,
          "includeAll": true,
          "label": "Replica set name",
          "multi": true,
          "name": "replica_set_name",
          "options": [],
          "query": {
            "query": "label_values(mongodb_up{group_id='$group_id', cluster_name='$cluster_name'}, replica_set_name)",
            "refId": "StandardVariableQuery"
          },
          "refresh": 2,
          "regex": "",
          "skipUrlSync": false,
          "sort": 0,
          "type": "query"
        },
        {
          "allValue": null,
          "current": {
            "selected": true,
            "text": [
              "All"
            ],
            "value": [
              "$__all"
            ]
          },
          "datasource": null,
          "definition": "label_values(mongodb_up{group_id='$group_id', cluster_name='$cluster_name',replica_set_name='$replica_set_name'},instance)",
          "description": null,
          "error": null,
          "hide": 0,
          "includeAll": true,
          "label": null,
          "multi": true,
          "name": "host",
          "options": [],
          "query": {
            "query": "label_values(mongodb_up{group_id='$group_id', cluster_name='$cluster_name',replica_set_name='$replica_set_name'},instance)",
            "refId": "StandardVariableQuery"
          },
          "refresh": 2,
          "regex": "(.*):.*",
          "skipUrlSync": false,
          "sort": 0,
          "type": "query"
        },
        {
          "allValue": null,
          "current": {
            "selected": true,
            "text": [
              "All"
            ],
            "value": [
              "$__all"
            ]
          },
          "datasource": null,
          "definition": "label_values(mongodb_up{group_id='$group_id', cluster_name='$cluster_name',replica_set_name='$replica_set_name'},process_port)",
          "description": "Only applicable for process level metrics",
          "error": null,
          "hide": 0,
          "includeAll": true,
          "label": "Process Port",
          "multi": true,
          "name": "process_port",
          "options": [],
          "query": {
            "query": "label_values(mongodb_up{group_id='$group_id', cluster_name='$cluster_name',replica_set_name='$replica_set_name'},process_port)",
            "refId": "StandardVariableQuery"
          },
          "refresh": 1,
          "regex": "",
          "skipUrlSync": false,
          "sort": 0,
          "type": "query"
        },
        {
          "auto": true,
          "auto_count": 30,
          "auto_min": "10s",
          "current": {
            "selected": false,
            "text": "1m",
            "value": "1m"
          },
          "description": null,
          "error": null,
          "hide": 0,
          "label": "Interval",
          "name": "interval",
          "options": [
            {
              "selected": false,
              "text": "auto",
              "value": "$__auto_interval_interval"
            },
            {
              "selected": false,
              "text": "30s",
              "value": "30s"
            },
            {
              "selected": true,
              "text": "1m",
              "value": "1m"
            },
            {
              "selected": false,
              "text": "5m",
              "value": "5m"
            },
            {
              "selected": false,
              "text": "30m",
              "value": "30m"
            },
            {
              "selected": false,
              "text": "1h",
              "value": "1h"
            },
            {
              "selected": false,
              "text": "1d",
              "value": "1d"
            }
          ],
          "query": "30s,1m,5m,30m,1h,1d",
          "queryValue": "",
          "refresh": 2,
          "skipUrlSync": false,
          "type": "interval"
        }
      ]
    },
    "time": {
      "from": "now-30m",
      "to": "now"
    },
    "timepicker": {},
    "timezone": "",
    "title": "Hardware Metrics - Ops Manager",
    "uid": "7LTNNcpnzsasddsd",
    "version": 1
   }
