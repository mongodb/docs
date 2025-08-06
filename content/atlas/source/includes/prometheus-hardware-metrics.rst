.. code-block:: json

   {
      "__inputs": [
        {
          "name": "DS_THANOS",
          "label": "thanos",
          "description": "",
          "type": "datasource",
          "pluginId": "prometheus",
          "pluginName": "Prometheus"
        }
      ],
      "__elements": [],
      "__requires": [
        {
          "type": "grafana",
          "id": "grafana",
          "name": "Grafana",
          "version": "8.5.6"
        },
        {
          "type": "panel",
          "id": "graph",
          "name": "Graph (old)",
          "version": ""
        },
        {
          "type": "datasource",
          "id": "prometheus",
          "name": "Prometheus",
          "version": "1.0.0"
        },
        {
          "type": "panel",
          "id": "table",
          "name": "Table",
          "version": ""
        },
        {
          "type": "panel",
          "id": "table-old",
          "name": "Table (old)",
          "version": ""
        }
      ],
      "annotations": {
        "list": [
          {
            "builtIn": 1,
            "datasource": {
              "type": "datasource",
              "uid": "grafana"
            },
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
      "editable": true,
      "fiscalYearStartMonth": 0,
      "graphTooltip": 0,
      "id": null,
      "iteration": 1657202135955,
      "links": [],
      "liveNow": false,
      "panels": [
        {
          "collapsed": false,
          "datasource": {
            "uid": "$Datasource"
          },
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
          "columns": [],
          "datasource": {
            "uid": "$Datasource"
          },
          "fontSize": "100%",
          "gridPos": {
            "h": 3,
            "w": 24,
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
          "showHeader": true,
          "sort": {
            "col": 0,
            "desc": true
          },
          "styles": [
            {
              "alias": "Time",
              "align": "auto",
              "dateFormat": "YYYY-MM-DD HH:mm:ss",
              "pattern": "Time",
              "type": "hidden"
            },
            {
              "alias": "",
              "align": "auto",
              "colors": [
                "rgba(245, 54, 54, 0.9)",
                "rgba(237, 129, 40, 0.89)",
                "rgba(50, 172, 45, 0.97)"
              ],
              "dateFormat": "YYYY-MM-DD HH:mm:ss",
              "decimals": 2,
              "mappingType": 1,
              "pattern": "Value",
              "thresholds": [],
              "type": "hidden",
              "unit": "short"
            },
            {
              "alias": "",
              "align": "auto",
              "colors": [
                "rgba(245, 54, 54, 0.9)",
                "rgba(237, 129, 40, 0.89)",
                "rgba(50, 172, 45, 0.97)"
              ],
              "decimals": 2,
              "pattern": "/.*/",
              "thresholds": [],
              "type": "number",
              "unit": "short"
            }
          ],
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(mongodb_up{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by ( group_id, org_id, rs_nm, cl_name), \"hostname\", \"$1\", \"instance\", \"(.*)\")\n",
              "format": "table",
              "instant": true,
              "interval": "",
              "legendFormat": "",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "title": "Group Metadata",
          "transform": "table",
          "transformations": [
            {
              "id": "organize",
              "options": {
                "excludeByName": {
                  "Time": true,
                  "Value #A": true,
                  "instance": true,
                  "rs_nm": false
                },
                "indexByName": {
                  "Time": 0,
                  "Value #A": 6,
                  "cl_name": 4,
                  "group_id": 3,
                  "org_id": 1,
                  "rs_nm": 5
                },
                "renameByName": {
                  "Time": "",
                  "cl_name": "Cluster Name",
                  "group_id": "Group Id",
                  "hostname": "Host",
                  "instance": "",
                  "org_id": "Org Id",
                  "process_port": "Port",
                  "replica_state": "ReplicaSet State",
                  "rs_nm": "ReplicaSet Name"
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
                  "replica_state": {
                    "aggregations": [],
                    "operation": "groupby"
                  },
                  "rs_nm": {
                    "aggregations": [],
                    "operation": "groupby"
                  }
                }
              }
            }
          ],
          "type": "table-old"
        },
        {
          "datasource": {
            "type": "prometheus",
            "uid": "$Datasource"
          },
          "fieldConfig": {
            "defaults": {
              "color": {
                "mode": "thresholds"
              },
              "custom": {
                "align": "auto",
                "displayMode": "auto",
                "inspect": false
              },
              "decimals": 2,
              "displayName": "",
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
              "unit": "none"
            },
            "overrides": []
          },
          "gridPos": {
            "h": 5,
            "w": 24,
            "x": 0,
            "y": 4
          },
          "id": 42,
          "options": {
            "footer": {
              "fields": "",
              "reducer": [
                "sum"
              ],
              "show": false
            },
            "showHeader": true
          },
          "pluginVersion": "8.5.6",
          "targets": [
            {
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              },
              "exemplar": false,
              "expr": "label_replace( sum(mongodb_info{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance, replica_state_name, process_port, rs_nm, process_type), \"hostname\", \"$1\", \"instance\", \"(.*):.*\")\n",
              "format": "table",
              "instant": true,
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
                  "Value": true,
                  "Value #A": true,
                  "instance": false,
                  "process_type": false,
                  "rs_nm": false
                },
                "indexByName": {
                  "Time": 0,
                  "Value #A": 6,
                  "hostname": 1,
                  "instance": 2,
                  "process_port": 3,
                  "replica_state": 4,
                  "rs_nm": 5
                },
                "renameByName": {
                  "Time": "",
                  "Value": "",
                  "hostname": "Host",
                  "instance": "Hostname",
                  "process_port": "Port",
                  "process_type": "Type",
                  "replica_state": "ReplicaSet State",
                  "replica_state_name": "Replica State Name",
                  "rs_nm": "ReplicaSet Name"
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
                  "Hostname": {
                    "aggregations": [],
                    "operation": "groupby"
                  },
                  "Port": {
                    "aggregations": [],
                    "operation": "groupby"
                  },
                  "Replica State Name": {
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
                  "replica_state": {
                    "aggregations": [],
                    "operation": "groupby"
                  },
                  "replica_state_name": {
                    "aggregations": [],
                    "operation": "groupby"
                  },
                  "rs_nm": {
                    "aggregations": [],
                    "operation": "groupby"
                  }
                }
              }
            },
            {
              "id": "merge",
              "options": {
                "reducers": []
              }
            }
          ],
          "type": "table"
        },
        {
          "collapsed": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "gridPos": {
            "h": 1,
            "w": 24,
            "x": 0,
            "y": 9
          },
          "id": 8,
          "panels": [],
          "title": "System Memory",
          "type": "row"
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The number of kilobytes of used shared memory (shared between several processes, thus including RAM disks, SYS-V-IPC and BSD like SHMEM)",
          "fieldConfig": {
            "defaults": {
              "links": []
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 8,
            "x": 0,
            "y": 10
          },
          "hiddenSeries": false,
          "id": 2,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true
          },
          "percentage": false,
          "pluginVersion": "8.5.6",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace(sum(hardware_system_memory_shared_mem_kilobytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "System Memory - Shared",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "deckbytes",
              "logBase": 1,
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The number of kilobytes of buffer cache, relatively temporary storage for raw disk blocks",
          "fieldConfig": {
            "defaults": {
              "links": []
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 8,
            "x": 8,
            "y": 10
          },
          "hiddenSeries": false,
          "id": 6,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true
          },
          "percentage": false,
          "pluginVersion": "8.5.6",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(hardware_system_memory_buffers_kilobytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "System Memory - Buffers",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "deckbytes",
              "logBase": 1,
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The number of kilobytes in the page cache.",
          "fieldConfig": {
            "defaults": {
              "links": []
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 8,
            "x": 16,
            "y": 10
          },
          "hiddenSeries": false,
          "id": 11,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true
          },
          "percentage": false,
          "pluginVersion": "8.5.6",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace (sum(hardware_system_memory_cached_kilobytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "System Memory - Cached",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "deckbytes",
              "logBase": 1,
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The number of kilobytes of physical memory in use\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "deckbytes"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 8,
            "x": 0,
            "y": 18
          },
          "hiddenSeries": false,
          "id": 13,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.5.6",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(hardware_system_memory_mem_total_kilobytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance) - sum(hardware_system_memory_mem_free_kilobytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "System Memory - Used",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "deckbytes",
              "logBase": 1,
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The total amount of swap space in free and used, measured in kilobytes\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "deckbytes"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 8,
            "x": 8,
            "y": 18
          },
          "hiddenSeries": false,
          "id": 37,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.5.6",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(hardware_system_memory_swap_total_kilobytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance) - sum(hardware_system_memory_swap_free_kilobytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "swap used for host - {{hostname}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            },
            {
              "exemplar": true,
              "expr": "label_replace (sum(hardware_system_memory_swap_free_kilobytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "hide": false,
              "interval": "",
              "legendFormat": "swap free for host - {{hostname}}",
              "refId": "B",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "System Memory - Swap",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "deckbytes",
              "logBase": 1,
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "An estimate of the number of kilobytes of system memory available for running new applications, without swapping",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "deckbytes"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 8,
            "x": 16,
            "y": 18
          },
          "hiddenSeries": false,
          "id": 15,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.5.6",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(hardware_system_memory_mem_available_kilobytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "System Memory - Available",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "deckbytes",
              "logBase": 1,
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "collapsed": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "gridPos": {
            "h": 1,
            "w": 24,
            "x": 0,
            "y": 26
          },
          "id": 17,
          "panels": [],
          "title": "System CPU",
          "type": "row"
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The percentage of time the CPU had something runnable, but the hypervisor chose to run something else. For servers with more than 1 CPU core, this value can exceed 100%.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "percent"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 7,
            "w": 6,
            "x": 0,
            "y": 27
          },
          "hiddenSeries": false,
          "id": 19,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(rate(hardware_system_cpu_steal_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval]) / 10) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "System cpu - steal",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "percent",
              "logBase": 1,
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The percentage of time the CPU spent servicing guest, which is included in user. For servers with more than 1 CPU core, this value can exceed 100%.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "percent"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 7,
            "w": 6,
            "x": 6,
            "y": 27
          },
          "hiddenSeries": false,
          "id": 20,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(rate(hardware_system_cpu_guest_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval]) / 10) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "System cpu - guest",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "percent",
              "logBase": 1,
              "min": "0",
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The percentage of time the CPU spent performing software interrupts. For servers with more than 1 CPU core, this value can exceed 100%.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "percent"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 7,
            "w": 6,
            "x": 12,
            "y": 27
          },
          "hiddenSeries": false,
          "id": 21,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(rate(hardware_system_cpu_soft_irq_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval]) / 10) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "System cpu - softirq",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "percent",
              "logBase": 1,
              "min": "0",
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The percentage of time the CPU spent performing hardware interrupts. For servers with more than 1 CPU core, this value can exceed 100%.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "percent"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 7,
            "w": 6,
            "x": 18,
            "y": 27
          },
          "hiddenSeries": false,
          "id": 22,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(rate(hardware_system_cpu_irq_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval]) / 10) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "System cpu - irq",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "percent",
              "logBase": 1,
              "min": "0",
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The percentage of time the CPU spent waiting for IO operations to complete. For servers with more than 1 CPU core, this value can exceed 100%\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "percent"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 7,
            "w": 6,
            "x": 0,
            "y": 34
          },
          "hiddenSeries": false,
          "id": 23,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace(sum(rate(hardware_system_cpu_io_wait_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval]) / 10) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "System cpu - iowait",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "percent",
              "logBase": 1,
              "min": "0",
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The percentage of time the CPU spent occupied by all processes with a positive nice value. For servers with more than 1 CPU core, this value can exceed 100%.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "percent"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 7,
            "w": 6,
            "x": 6,
            "y": 34
          },
          "hiddenSeries": false,
          "id": 24,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(rate(hardware_system_cpu_nice_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval]) / 10) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "System cpu - nice",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "percent",
              "logBase": 1,
              "min": "0",
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The percentage of time the CPU spent servicing operating system calls from all processes. For servers with more than 1 CPU core, this value can exceed 100%.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "percent"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 7,
            "w": 6,
            "x": 12,
            "y": 34
          },
          "hiddenSeries": false,
          "id": 25,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(rate(hardware_system_cpu_kernel_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval]) / 10) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "System cpu - kernel",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "percent",
              "logBase": 1,
              "min": "0",
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The percentage of time the CPU spent servicing all user applications (not just MongoDB processes). For servers with more than 1 CPU core, this value can exceed 100%.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "percent"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 7,
            "w": 6,
            "x": 18,
            "y": 34
          },
          "hiddenSeries": false,
          "id": 26,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(rate(hardware_system_cpu_user_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval]) / 10) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "System cpu - user",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "percent",
              "logBase": 1,
              "min": "0",
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "collapsed": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "gridPos": {
            "h": 1,
            "w": 24,
            "x": 0,
            "y": 41
          },
          "id": 44,
          "panels": [],
          "title": "Normalized System Cpu",
          "type": "row"
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The percentage of time the CPU had something runnable, but the hypervisor chose to run something else. It is scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "percent"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 7,
            "w": 6,
            "x": 0,
            "y": 42
          },
          "hiddenSeries": false,
          "id": 46,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(rate(hardware_system_cpu_steal_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval]) / (10 * hardware_platform_num_logical_cpus{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"})) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Normalized System cpu - steal",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "percent",
              "logBase": 1,
              "min": "0",
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The percentage of time the CPU spent servicing guest, which is included in user. It is scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "percent"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 7,
            "w": 6,
            "x": 6,
            "y": 42
          },
          "hiddenSeries": false,
          "id": 47,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(rate(hardware_system_cpu_guest_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval]) / (10 * hardware_platform_num_logical_cpus{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"})) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Normalized System cpu - guest",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "percent",
              "logBase": 1,
              "min": "0",
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The percentage of time the CPU spent performing software interrupts. It is scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "percent"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 7,
            "w": 6,
            "x": 12,
            "y": 42
          },
          "hiddenSeries": false,
          "id": 48,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(rate(hardware_system_cpu_soft_irq_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval]) / (10 * hardware_platform_num_logical_cpus{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"})) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Normalized System cpu - softirq",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "percent",
              "logBase": 1,
              "min": "0",
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The percentage of time the CPU spent performing hardware interrupts. It is scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "percent"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 7,
            "w": 6,
            "x": 18,
            "y": 42
          },
          "hiddenSeries": false,
          "id": 49,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(rate(hardware_system_cpu_irq_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval]) / (10 * hardware_platform_num_logical_cpus{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"})) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Normalized System cpu - irq",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "percent",
              "logBase": 1,
              "min": "0",
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The percentage of time the CPU spent waiting for IO operations to complete. It is scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "percent"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 7,
            "w": 6,
            "x": 0,
            "y": 49
          },
          "hiddenSeries": false,
          "id": 51,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace(sum(rate(hardware_system_cpu_io_wait_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval]) / (10 * hardware_platform_num_logical_cpus{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"})) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Normalized System cpu - iowait",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "percent",
              "logBase": 1,
              "min": "0",
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The percentage of time the CPU spent occupied by all processes with a positive nice value. It is scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "percent"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 7,
            "w": 6,
            "x": 6,
            "y": 49
          },
          "hiddenSeries": false,
          "id": 52,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(rate(hardware_system_cpu_nice_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval]) / (10 * hardware_platform_num_logical_cpus{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"})) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Normalized System cpu - nice",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "percent",
              "logBase": 1,
              "min": "0",
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The percentage of time the CPU spent servicing operating system calls from all processes. It is scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "percent"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 7,
            "w": 6,
            "x": 12,
            "y": 49
          },
          "hiddenSeries": false,
          "id": 53,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(rate(hardware_system_cpu_kernel_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval]) / (10 * hardware_platform_num_logical_cpus{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"})) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Normalized System cpu - kernel",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "percent",
              "logBase": 1,
              "min": "0",
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The percentage of time the CPU spent servicing all user applications (not just MongoDB processes). It is scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "percent"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 7,
            "w": 6,
            "x": 18,
            "y": 49
          },
          "hiddenSeries": false,
          "id": 50,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(rate(hardware_system_cpu_user_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval]) / (10 * hardware_platform_num_logical_cpus{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"})) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Normalized System cpu - user",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "percent",
              "logBase": 1,
              "min": "0",
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "collapsed": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "gridPos": {
            "h": 1,
            "w": 24,
            "x": 0,
            "y": 56
          },
          "id": 28,
          "panels": [],
          "title": "System Network",
          "type": "row"
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The average rate of physical bytes received per second by the eth0 network interface\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "Bps"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 9,
            "w": 24,
            "x": 0,
            "y": 57
          },
          "hiddenSeries": false,
          "id": 73,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(rate(hardware_system_network_eth0_bytes_in_bytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval])) by (instance) + sum(rate(hardware_system_network_lo_bytes_in_bytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval])) by (instance), \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "rx - {{hostname}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            },
            {
              "expr": "label_replace( -1 * sum(rate(hardware_system_network_eth0_bytes_out_bytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval])) by (instance) + sum(rate(hardware_system_network_lo_bytes_out_bytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval])) by (instance), \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "legendFormat": "tx - {{hostname}}",
              "refId": "B",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Network traffic",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "Bps",
              "logBase": 1,
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "collapsed": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "gridPos": {
            "h": 1,
            "w": 24,
            "x": 0,
            "y": 66
          },
          "id": 30,
          "panels": [],
          "title": "System Disk",
          "type": "row"
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The total bytes of free disk space on the disk partition used by MongoDB.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "decbytes"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 6,
            "x": 0,
            "y": 67
          },
          "hiddenSeries": false,
          "id": 14,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(hardware_disk_metrics_disk_space_free_bytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance, disk_name) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "disk - {{disk_name}}, host - {{hostname}} ",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "System Disk - Free",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "decbytes",
              "logBase": 1,
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The percent of free disk space on the partition used by MongoDB.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "percent"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 6,
            "x": 6,
            "y": 67
          },
          "hiddenSeries": false,
          "id": 71,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(hardware_disk_metrics_disk_space_free_bytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"} / (hardware_disk_metrics_disk_space_used_bytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"} + hardware_disk_metrics_disk_space_free_bytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) * 100) by (instance, disk_name) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "disk - {{disk_name}}, host - {{hostname}} ",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "System Disk Percent Free",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "percent",
              "logBase": 1,
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The total bytes of used disk space on the partition that runs MongoDB.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "decbytes"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 6,
            "x": 12,
            "y": 67
          },
          "hiddenSeries": false,
          "id": 36,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(hardware_disk_metrics_disk_space_used_bytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance, disk_name) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "disk - {{disk_name}} host - {{hostname}} ",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "System Disk - Used",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "decbytes",
              "logBase": 1,
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The write throughput of I/O operations per second for the disk partition used for MongoDB.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "/ sec"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 6,
            "x": 18,
            "y": 67
          },
          "hiddenSeries": false,
          "id": 63,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(rate(hardware_disk_metrics_write_count{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval])) by (instance, disk_name) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "hide": false,
              "interval": "",
              "legendFormat": "disk - {{disk_name}} host - {{hostname}} ",
              "refId": "B",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "System Disk Write IOPS",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "/ sec",
              "logBase": 1,
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The write latency in milliseconds of the disk partition used by MongoDB.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "ms"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 6,
            "x": 0,
            "y": 75
          },
          "hiddenSeries": false,
          "id": 64,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(rate(hardware_disk_metrics_write_time_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval]) / rate(hardware_disk_metrics_write_count{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval])) by (instance, disk_name), \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "hide": false,
              "interval": "",
              "legendFormat": "disk - {{disk_name}} host - {{hostname}} ",
              "refId": "B",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "System Disk Write Latency",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "ms",
              "logBase": 1,
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The Read latency in milliseconds of the disk partition used by MongoDB.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "ms"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 6,
            "x": 6,
            "y": 75
          },
          "hiddenSeries": false,
          "id": 65,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(rate(hardware_disk_metrics_read_time_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval]) / rate(hardware_disk_metrics_read_count{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval])) by (instance, disk_name), \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "hide": false,
              "interval": "",
              "legendFormat": "disk - {{disk_name}} host - {{hostname}} ",
              "refId": "B",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "System Disk Read Latency",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "ms",
              "logBase": 1,
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The read throughput of I/O operations per second for the disk partition used for MongoDB.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "/ sec"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 6,
            "x": 12,
            "y": 75
          },
          "hiddenSeries": false,
          "id": 62,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(rate(hardware_disk_metrics_read_count{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval])) by (instance, disk_name) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "disk - {{disk_name}} host - {{hostname}} ",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "System Disk Read IOPS",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "/ sec",
              "logBase": 1,
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The percentage of time during which requests are being issued to and serviced by the partition. This includes requests from any process, not just MongoDB processes.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "percent"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 6,
            "x": 18,
            "y": 75
          },
          "hiddenSeries": false,
          "id": 67,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(rate(hardware_disk_metrics_total_time_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval]) ) by (instance, disk_name) / 10, \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "hide": false,
              "interval": "",
              "legendFormat": "disk - {{disk_name}} host - {{hostname}} ",
              "refId": "B",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "System Disk Util %",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "percent",
              "logBase": 1,
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The average length of queue of requests issued to the disk partition used by MongoDB.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "ms"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 6,
            "x": 0,
            "y": 83
          },
          "hiddenSeries": false,
          "id": 66,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(rate(hardware_disk_metrics_weighted_time_io_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval]) ) by (instance, DiskName), \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "hide": false,
              "interval": "",
              "legendFormat": "disk - {{disk_name}} host - {{hostname}} ",
              "refId": "B",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "System Disk Queue Depth",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "ms",
              "logBase": 1,
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "collapsed": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "gridPos": {
            "h": 1,
            "w": 24,
            "x": 0,
            "y": 91
          },
          "id": 32,
          "panels": [],
          "title": "Process CPU",
          "type": "row"
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The percentage of time the CPU spent servicing this MongoDB process, scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "percent"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 7,
            "w": 6,
            "x": 0,
            "y": 92
          },
          "hiddenSeries": false,
          "id": 54,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace((sum(rate(hardware_process_cpu_user_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\", process_port=~\"$process_port\" } [$interval])) by (instance, process_port)  / on(instance) group_left  hardware_platform_num_logical_cpus{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\" })/10, \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}} port - {{process_port}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Normalized Process cpu - user",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "percent",
              "logBase": 1,
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "percent"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 7,
            "w": 6,
            "x": 6,
            "y": 92
          },
          "hiddenSeries": false,
          "id": 58,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace((sum(rate(hardware_process_cpu_children_user_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\", process_port=~\"$process_port\" } [$interval])) by (instance, process_port)  / on(instance) group_left  hardware_platform_num_logical_cpus{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\" })/10, \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}} port - {{process_port}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Normalized Process cpu - children user",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "percent",
              "logBase": 1,
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The percentage of time the CPU spent servicing operating system calls for this MongoDB process, scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "percent"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 7,
            "w": 6,
            "x": 12,
            "y": 92
          },
          "hiddenSeries": false,
          "id": 55,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace((sum(rate(hardware_process_cpu_kernel_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\", process_port=~\"$process_port\" } [$interval])) by (instance, process_port)  / on(instance) group_left  hardware_platform_num_logical_cpus{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\" })/10, \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}} port - {{process_port}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Normalized Process cpu - kernel",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "percent",
              "logBase": 1,
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "percent"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 7,
            "w": 6,
            "x": 18,
            "y": 92
          },
          "hiddenSeries": false,
          "id": 57,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace((sum(rate(hardware_process_cpu_children_kernel_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\", process_port=~\"$process_port\" } [$interval])) by (instance, process_port)  / on(instance) group_left  hardware_platform_num_logical_cpus{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\" })/10, \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}} port - {{process_port}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Normalized Process cpu - children kernel",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "percent",
              "logBase": 1,
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The percentage of time the CPU spent servicing this MongoDB process. For servers with more than 1 CPU core, this value can exceed 100%.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "percent"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 7,
            "w": 6,
            "x": 0,
            "y": 99
          },
          "hiddenSeries": false,
          "id": 56,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace(sum(rate(hardware_process_cpu_user_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\", process_port=~\"$process_port\" } [$interval])) by (instance, process_port)  / 10, \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}} port - {{process_port}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Process cpu - user",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "percent",
              "logBase": 1,
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "percent"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 7,
            "w": 6,
            "x": 6,
            "y": 99
          },
          "hiddenSeries": false,
          "id": 59,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace(sum(rate(hardware_process_cpu_children_user_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\", process_port=~\"$process_port\" } [$interval])) by (instance, process_port)  / 10, \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}} port - {{process_port}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Process cpu - child user",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "percent",
              "logBase": 1,
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The percentage of time the CPU spent servicing operating system calls for this MongoDB process. For servers with more than 1 CPU core, this value can exceed 100%.\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "percent"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 7,
            "w": 6,
            "x": 12,
            "y": 99
          },
          "hiddenSeries": false,
          "id": 60,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace(sum(rate(hardware_process_cpu_kernel_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\", process_port=~\"$process_port\" } [$interval])) by (instance, process_port)  / 10, \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}} port - {{process_port}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Process cpu - kernel",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "percent",
              "logBase": 1,
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "percent"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 7,
            "w": 6,
            "x": 18,
            "y": 99
          },
          "hiddenSeries": false,
          "id": 61,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace(sum(rate(hardware_process_cpu_children_kernel_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\", process_port=~\"$process_port\" } [$interval])) by (instance, process_port)  / 10, \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "host - {{hostname}} port - {{process_port}}",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Process cpu - children kernel",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "percent",
              "logBase": 1,
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        },
        {
          "collapsed": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "gridPos": {
            "h": 1,
            "w": 24,
            "x": 0,
            "y": 106
          },
          "id": 69,
          "panels": [],
          "title": "Misc.",
          "type": "row"
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "uid": "$Datasource"
          },
          "description": "The total number of pages swapped in and out per second\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "/ sec"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 6,
            "x": 0,
            "y": 107
          },
          "hiddenSeries": false,
          "id": 70,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 1,
          "nullPointMode": "null",
          "options": {
            "alertThreshold": true,
            "legend": {
              "calcs": [],
              "displayMode": "list",
              "placement": "bottom"
            },
            "tooltip": {
              "mode": "single"
            }
          },
          "percentage": false,
          "pluginVersion": "8.3.4",
          "pointradius": 2,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "spaceLength": 10,
          "stack": false,
          "steppedLine": false,
          "targets": [
            {
              "exemplar": true,
              "expr": "label_replace( sum(rate(hardware_system_vm_page_swap_in{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval]) ) by (instance), \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "hide": false,
              "interval": "",
              "legendFormat": "swap in for host - {{hostname}} ",
              "refId": "B",
              "datasource": {
                "uid": "$Datasource"
              }
            },
            {
              "exemplar": true,
              "expr": "label_replace( sum(rate(hardware_system_vm_page_swap_out{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[$interval]) ) by (instance), \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "hide": false,
              "interval": "",
              "legendFormat": "swap out for host - {{hostname}} ",
              "refId": "A",
              "datasource": {
                "uid": "$Datasource"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "System VM Swap IO",
          "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
          },
          "type": "graph",
          "xaxis": {
            "mode": "time",
            "show": true,
            "values": []
          },
          "yaxes": [
            {
              "format": "/ sec",
              "logBase": 1,
              "show": true
            },
            {
              "format": "short",
              "logBase": 1,
              "show": true
            }
          ],
          "yaxis": {
            "align": false
          }
        }
      ],
      "schemaVersion": 36,
      "style": "dark",
      "tags": [],
      "templating": {
        "list": [
          {
            "current": {
              "selected": false,
              "text": "thanos",
              "value": "thanos"
            },
            "hide": 0,
            "includeAll": false,
            "multi": false,
            "name": "Datasource",
            "options": [],
            "query": "prometheus",
            "queryValue": "",
            "refresh": 1,
            "skipUrlSync": false,
            "type": "datasource"
          },
          {
            "current": {},
            "datasource": {
              "type": "prometheus",
              "uid": "$Datasource"
            },
            "definition": "label_values(mongodb_up, job)",
            "hide": 0,
            "includeAll": false,
            "multi": false,
            "name": "job",
            "options": [],
            "query": {
              "query": "label_values(mongodb_up, job)",
              "refId": "thanos-job-Variable-Query"
            },
            "refresh": 1,
            "regex": "",
            "skipUrlSync": false,
            "sort": 0,
            "tagValuesQuery": "",
            "tagsQuery": "",
            "type": "query",
            "useTags": false
          },
          {
            "current": {},
            "datasource": {
              "type": "prometheus",
              "uid": "$Datasource"
            },
            "definition": "label_values(mongodb_up{job=\"$job\"}, group_id)",
            "hide": 0,
            "includeAll": false,
            "label": "Group Id",
            "multi": false,
            "name": "group_id",
            "options": [],
            "query": {
              "query": "label_values(mongodb_up{job=\"$job\"}, group_id)",
              "refId": "thanos-group_id-Variable-Query"
            },
            "refresh": 1,
            "regex": "",
            "skipUrlSync": false,
            "sort": 0,
            "tagValuesQuery": "",
            "tagsQuery": "",
            "type": "query",
            "useTags": false
          },
          {
            "current": {},
            "datasource": {
              "type": "prometheus",
              "uid": "$Datasource"
            },
            "definition": "label_values(mongodb_up{group_id='$group_id'}, cl_name)",
            "hide": 0,
            "includeAll": false,
            "label": "Cluster Name",
            "multi": false,
            "name": "cl_name",
            "options": [],
            "query": {
              "query": "label_values(mongodb_up{group_id='$group_id'}, cl_name)",
              "refId": "thanos-cl_name-Variable-Query"
            },
            "refresh": 2,
            "regex": "",
            "skipUrlSync": false,
            "sort": 0,
            "tagValuesQuery": "",
            "tagsQuery": "",
            "type": "query",
            "useTags": false
          },
          {
            "current": {},
            "datasource": {
              "type": "prometheus",
              "uid": "$Datasource"
            },
            "definition": "label_values(mongodb_up{group_id='$group_id', cl_name='$cl_name'}, rs_nm)",
            "hide": 0,
            "includeAll": true,
            "label": "Replica set name",
            "multi": true,
            "name": "rs_nm",
            "options": [],
            "query": {
              "query": "label_values(mongodb_up{group_id='$group_id', cl_name='$cl_name'}, rs_nm)",
              "refId": "thanos-rs_nm-Variable-Query"
            },
            "refresh": 1,
            "regex": "",
            "skipUrlSync": false,
            "sort": 0,
            "tagValuesQuery": "",
            "tagsQuery": "",
            "type": "query",
            "useTags": false
          },
          {
            "current": {},
            "datasource": {
              "type": "prometheus",
              "uid": "$Datasource"
            },
            "definition": "label_values(mongodb_up{group_id='$group_id', cl_name='$cl_name',rs_nm='$rs_nm'},instance)",
            "hide": 0,
            "includeAll": true,
            "multi": true,
            "name": "host",
            "options": [],
            "query": {
              "query": "label_values(mongodb_up{group_id='$group_id', cl_name='$cl_name',rs_nm='$rs_nm'},instance)",
              "refId": "thanos-host-Variable-Query"
            },
            "refresh": 2,
            "regex": "",
            "skipUrlSync": false,
            "sort": 0,
            "tagValuesQuery": "",
            "tagsQuery": "",
            "type": "query",
            "useTags": false
          },
          {
            "current": {},
            "datasource": {
              "type": "prometheus",
              "uid": "$Datasource"
            },
            "definition": "label_values(mongodb_up{group_id='$group_id', cl_name='$cl_name',rs_nm='$rs_nm'},process_port)",
            "description": "Only applicable for process level metrics",
            "hide": 0,
            "includeAll": true,
            "label": "Process Port",
            "multi": true,
            "name": "process_port",
            "options": [],
            "query": {
              "query": "label_values(mongodb_up{group_id='$group_id', cl_name='$cl_name',rs_nm='$rs_nm'},process_port)",
              "refId": "thanos-process_port-Variable-Query"
            },
            "refresh": 1,
            "regex": "",
            "skipUrlSync": false,
            "sort": 0,
            "tagValuesQuery": "",
            "tagsQuery": "",
            "type": "query",
            "useTags": false
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
        "from": "now-6h",
        "to": "now"
      },
      "timepicker": {
        "refresh_intervals": [
          "5s",
          "10s",
          "30s",
          "1m",
          "5m",
          "15m",
          "30m",
          "1h",
          "2h",
          "1d"
        ]
      },
      "timezone": "",
      "title": "Dedicated Atlas Clusters - Hardware Metrics",
      "uid": "_s7Pjkb7z",
      "version": 23,
      "weekStart": ""
   }
