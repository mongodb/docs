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
      "iteration": 1657202032408,
      "links": [],
      "liveNow": false,
      "panels": [
        {
          "collapsed": false,
          "datasource": {
            "type": "prometheus",
            "uid": "000000010"
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
          "datasource": {
            "type": "prometheus",
            "uid": "${DS_THANOS}"
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
              "unit": "short"
            },
            "overrides": [
              {
                "matcher": {
                  "id": "byName",
                  "options": "Value"
                },
                "properties": [
                  {
                    "id": "unit",
                    "value": "short"
                  },
                  {
                    "id": "decimals",
                    "value": 2
                  },
                  {
                    "id": "custom.align"
                  }
                ]
              }
            ]
          },
          "gridPos": {
            "h": 4,
            "w": 24,
            "x": 0,
            "y": 1
          },
          "id": 41,
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
              "expr": "label_replace( sum(mongodb_info{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (group_id, org_id, rs_nm, cl_name), \"hostname\", \"$1\", \"instance\", \"(.*)\")\n",
              "format": "table",
              "instant": true,
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
                  "rs_nm": false
                },
                "indexByName": {
                  "": 2,
                  "Time": 0,
                  "Value #A": 6,
                  "cl_name": 4,
                  "group_id": 3,
                  "org_id": 1,
                  "rs_nm": 5
                },
                "renameByName": {
                  "": "Group Name ",
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
          "datasource": {
            "type": "prometheus",
            "uid": "${DS_THANOS}"
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
              "decimals": 0,
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
            "h": 6,
            "w": 24,
            "x": 0,
            "y": 5
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
                  "Value #A": true,
                  "instance": false,
                  "rs_nm": false
                },
                "indexByName": {
                  "Time": 0,
                  "Value": 6,
                  "instance": 1,
                  "process_port": 2,
                  "process_type": 4,
                  "replica_state_name": 5,
                  "rs_nm": 3
                },
                "renameByName": {
                  "Time": "",
                  "Value": "",
                  "hostname": "Host",
                  "instance": "Hostname",
                  "process_port": "Port",
                  "process_type": "Process Type",
                  "replica_state": "ReplicaSet State",
                  "replica_state_name": "Replica State",
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
                  "Process Type": {
                    "aggregations": [],
                    "operation": "groupby"
                  },
                  "Replica State": {
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
            "type": "prometheus",
            "uid": "000000010"
          },
          "gridPos": {
            "h": 1,
            "w": 24,
            "x": 0,
            "y": 11
          },
          "id": 8,
          "panels": [],
          "title": "Memory",
          "type": "row"
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The number of megabytes resident. MMAPv1: It is typical over time, on a dedicated database server, for this number to approach the amount of physical ram on the box. WiredTiger: In a standard deployment resident is the amount of memory used by the WiredTiger cache plus the memory dedicated to other in memory structures used by the mongod process. By default, mongod with WiredTiger reserves 50% of the total physical memory on the server for the cache and at steady state, WiredTiger tries to limit cache usage to 80% of that total. For example, if a server has 16GB of memory, WiredTiger will assume it can use 8GB for cache and at steady state should use about 6.5GB.",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "decmbytes"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 12,
            "x": 0,
            "y": 12
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
              "expr": "label_replace(sum(mongodb_mem_resident{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Memory - Resident",
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
              "format": "decmbytes",
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
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The virtual megabytes for the mongod process. MMAPv1: Generally virtual should be a little larger than mapped (or 2x with --journal), but if virtual is many gigabytes larger, it indicates that excessive memory is being used by other aspects than the memory mapping of files -- that would be bad/suboptimal. The most common case of usage of a high amount of memory for non-mapped is that there are very many connections to the database. Each connection has a thread stack and the memory for those stacks can add up to a considerable amount. WiredTiger: Generally virtual should be a little larger than mapped, but if virtual is many gigabytes larger, it indicates that excessive memory is being used by other aspects than the memory mapping of files -- that would be bad/suboptimal. The most common case of usage of a high amount of memory for non-mapped is that there are very many connections to the database. Each connection has a thread stack and the memory for those stacks can add up to a considerable amount.",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "decmbytes"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 12,
            "x": 12,
            "y": 12
          },
          "hiddenSeries": false,
          "id": 72,
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
              "expr": "label_replace(sum(mongodb_mem_virtual{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Memory - Virtual",
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
              "format": "decmbytes",
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
            "type": "prometheus",
            "uid": "000000010"
          },
          "gridPos": {
            "h": 1,
            "w": 24,
            "x": 0,
            "y": 20
          },
          "id": 17,
          "panels": [],
          "title": "Asserts",
          "type": "row"
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The average rate of regular asserts raised per second over the selected sample period\n",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "/s"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 6,
            "x": 0,
            "y": 21
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
              "expr": "label_replace(sum(rate(mongodb_asserts_regular{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Asserts - Regular",
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
              "format": "/s",
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
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The average rate of warnings per second over the selected sample period",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "/s"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 6,
            "x": 6,
            "y": 21
          },
          "hiddenSeries": false,
          "id": 74,
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
              "expr": "label_replace(sum(rate(mongodb_asserts_warning{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Asserts - Warning",
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
              "format": "/s",
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
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The average rate of message asserts per second over the selected sample period. These are internal server errors that have a well defined text string. Stack traces are logged for these",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "/s"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 6,
            "x": 12,
            "y": 21
          },
          "hiddenSeries": false,
          "id": 75,
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
              "expr": "label_replace(sum(rate(mongodb_asserts_msg{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Asserts - Message",
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
              "format": "/s",
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
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The average rate of user asserts per second over the selected sample period. These are errors that can be generated by a user such as out of disk space or duplicate key",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "/s"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 6,
            "x": 18,
            "y": 21
          },
          "hiddenSeries": false,
          "id": 76,
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
              "expr": "label_replace(sum(rate(mongodb_asserts_user{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Asserts - User",
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
              "format": "/s",
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
            "type": "prometheus",
            "uid": "000000010"
          },
          "gridPos": {
            "h": 1,
            "w": 24,
            "x": 0,
            "y": 29
          },
          "id": 44,
          "panels": [],
          "title": "Cache",
          "type": "row"
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The average rate of bytes per second read into WiredTiger's cache over the selected sample period.",
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
            "h": 8,
            "w": 6,
            "x": 0,
            "y": 30
          },
          "hiddenSeries": false,
          "id": 77,
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
              "expr": "label_replace(sum(irate(mongodb_wiredTiger_cache_bytes_read_into_cache{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Cache Activity - Read Into",
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
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The average rate of bytes per second written from WiredTiger's cache over the selected sample period.\n",
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
            "h": 8,
            "w": 6,
            "x": 6,
            "y": 30
          },
          "hiddenSeries": false,
          "id": 78,
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
              "expr": "label_replace(sum(irate(mongodb_wiredTiger_cache_bytes_written_from_cache{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Cache Activity - Write From",
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
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The number of bytes currently in the WiredTiger cache.",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "bytes"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 6,
            "x": 12,
            "y": 30
          },
          "hiddenSeries": false,
          "id": 79,
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
              "expr": "label_replace(sum(mongodb_wiredTiger_cache_bytes_currently_in_the_cache{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Cache Usage - Used",
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
              "format": "bytes",
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
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The number of tracked dirty bytes currently in the WiredTiger cache.",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "bytes"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 6,
            "x": 18,
            "y": 30
          },
          "hiddenSeries": false,
          "id": 80,
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
              "expr": "label_replace(sum(mongodb_wiredTiger_cache_tracked_dirty_bytes_in_the_cache{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Cache Usage - Dirty",
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
              "format": "bytes",
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
            "type": "prometheus",
            "uid": "000000010"
          },
          "gridPos": {
            "h": 1,
            "w": 24,
            "x": 0,
            "y": 38
          },
          "id": 28,
          "panels": [],
          "title": "Connections",
          "type": "row"
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The number of currently active connections to this server. A stack is allocated per connection; thus very many connections can result in significant RAM usage.",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "none"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 9,
            "w": 24,
            "x": 0,
            "y": 39
          },
          "hiddenSeries": false,
          "id": 81,
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
              "expr": "label_replace(sum(mongodb_connections_current{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Connections - Current",
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
              "format": "none",
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
            "type": "prometheus",
            "uid": "000000010"
          },
          "gridPos": {
            "h": 1,
            "w": 24,
            "x": 0,
            "y": 48
          },
          "id": 30,
          "panels": [],
          "title": "Cursors",
          "type": "row"
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The number of cursors that the server is maintaining for clients. Because MongoDB exhausts unused cursors, typically this value is small or zero. However, if there is a queue, stale tailable cursors, or a large number of operations this value may rise.",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "none"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 13,
            "x": 0,
            "y": 49
          },
          "hiddenSeries": false,
          "id": 82,
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
              "expr": "label_replace(sum(mongodb_metrics_cursor_open_total{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Cursors - Total Open",
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
              "format": "none",
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
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The average rate of cursors that have timed out per second over the selected sample period",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "none"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 11,
            "x": 13,
            "y": 49
          },
          "hiddenSeries": false,
          "id": 83,
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
              "expr": "label_replace(sum(mongodb_metrics_cursor_timedOut{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Cursors - Timed Out",
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
              "format": "none",
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
            "type": "prometheus",
            "uid": "000000010"
          },
          "gridPos": {
            "h": 1,
            "w": 24,
            "x": 0,
            "y": 57
          },
          "id": 32,
          "panels": [],
          "title": "Document Metrics",
          "type": "row"
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The average rate per second of documents returned by queries over the selected sample period.",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "/s"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 6,
            "x": 0,
            "y": 58
          },
          "hiddenSeries": false,
          "id": 84,
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
              "expr": "label_replace(sum(irate(mongodb_metrics_document_returned{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Document Metrics - Returned",
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
              "format": "/s",
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
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The average rate per second of documents inserted over the selected sample period.",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "/s"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 6,
            "x": 6,
            "y": 58
          },
          "hiddenSeries": false,
          "id": 87,
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
              "expr": "label_replace(sum(irate(mongodb_metrics_document_inserted{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Document Metrics - Inserted",
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
              "format": "/s",
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
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The average rate per second of documents updated over the selected sample period.",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "/s"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 6,
            "x": 12,
            "y": 58
          },
          "hiddenSeries": false,
          "id": 86,
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
              "expr": "label_replace(sum(irate(mongodb_metrics_document_updated{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Document Metrics - Updated",
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
              "format": "/s",
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
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The average rate per second of documents deleted over the selected sample period.",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "/s"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 6,
            "x": 18,
            "y": 58
          },
          "hiddenSeries": false,
          "id": 85,
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
              "expr": "label_replace(sum(irate(mongodb_metrics_document_deleted{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Document Metrics - Deleted",
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
              "format": "/s",
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
            "type": "prometheus",
            "uid": "000000010"
          },
          "gridPos": {
            "h": 1,
            "w": 24,
            "x": 0,
            "y": 66
          },
          "id": 69,
          "panels": [],
          "title": "Network",
          "type": "row"
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The average rate of requests sent to this database server per second over the selected sample period",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "/s"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 8,
            "x": 0,
            "y": 67
          },
          "hiddenSeries": false,
          "id": 88,
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
              "expr": "label_replace(sum(irate(mongodb_network_numRequests{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Network - Num Requests",
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
              "format": "/s",
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
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The average rate of physical (after any wire compression) bytes sent to this database server per second over the selected sample period",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "binBps"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 16,
            "x": 8,
            "y": 67
          },
          "hiddenSeries": false,
          "id": 90,
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
              "expr": "label_replace(sum(irate(mongodb_network_bytesIn{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "rx - {{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            },
            {
              "expr": "label_replace(-1 * sum(irate(mongodb_network_bytesOut{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "legendFormat": "tx - {{hostname}}:{{process_port}}",
              "refId": "B",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Network - Bytes In",
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
              "format": "binBps",
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
            "type": "prometheus",
            "uid": "000000010"
          },
          "gridPos": {
            "h": 1,
            "w": 24,
            "x": 0,
            "y": 75
          },
          "id": 93,
          "panels": [],
          "title": "Opcounters",
          "type": "row"
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The average rate of commands performed per second over the selected sample period",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "/s"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 8,
            "x": 0,
            "y": 76
          },
          "hiddenSeries": false,
          "id": 96,
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
              "expr": "label_replace(sum(irate(mongodb_opcounters_command{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Opcounters - Command",
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
              "format": "/s",
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
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The average rate of queries performed per second over the selected sample period",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "/s"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 8,
            "x": 8,
            "y": 76
          },
          "hiddenSeries": false,
          "id": 101,
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
              "expr": "label_replace(sum(irate(mongodb_opcounters_query{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Opcounters - Query",
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
              "format": "/s",
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
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The average rate of updates performed per second over the selected sample period",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "/s"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 8,
            "x": 16,
            "y": 76
          },
          "hiddenSeries": false,
          "id": 100,
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
              "expr": "label_replace(sum(irate(mongodb_opcounters_update{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Opcounters - Update",
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
              "format": "/s",
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
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The average rate of deletes performed per second over the selected sample period",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "/s"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 8,
            "x": 0,
            "y": 84
          },
          "hiddenSeries": false,
          "id": 99,
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
              "expr": "label_replace(sum(irate(mongodb_opcounters_delete{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Opcounters - Delete",
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
              "format": "/s",
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
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The average rate of getMores performed per second on any cursor over the selected sample period. On a primary, this number can be high even if the query count is low as the secondaries \"getMore\" from the primary often as part of replication.",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "/s"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 8,
            "x": 8,
            "y": 84
          },
          "hiddenSeries": false,
          "id": 97,
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
              "expr": "label_replace(sum(irate(mongodb_opcounters_getmore{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Opcounters - Getmore",
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
              "format": "/s",
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
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The average rate of inserts performed per second over the selected sample period",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "/s"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 8,
            "x": 16,
            "y": 84
          },
          "hiddenSeries": false,
          "id": 98,
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
              "expr": "label_replace(sum(irate(mongodb_opcounters_insert{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Opcounters - Insert",
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
              "format": "/s",
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
            "type": "prometheus",
            "uid": "000000010"
          },
          "gridPos": {
            "h": 1,
            "w": 24,
            "x": 0,
            "y": 92
          },
          "id": 95,
          "panels": [],
          "title": "Operation Execution Times",
          "type": "row"
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The average execution time in milliseconds per read operation over the selected sample period.",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "µs"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 8,
            "x": 0,
            "y": 93
          },
          "hiddenSeries": false,
          "id": 102,
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
              "expr": "label_replace(sum(irate(mongodb_opLatencies_reads_latency{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])/irate(mongodb_opLatencies_reads_ops{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Operation Execution Times - Avg Ms/Read",
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
              "format": "µs",
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
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The average execution time in milliseconds per write operation over the selected sample period.",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "µs"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 8,
            "x": 8,
            "y": 93
          },
          "hiddenSeries": false,
          "id": 104,
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
              "expr": "label_replace(sum(irate(mongodb_opLatencies_writes_latency{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])/irate(mongodb_opLatencies_writes_ops{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Operation Execution Times - Avg Ms/Write",
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
              "format": "µs",
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
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The average execution time in milliseconds per command operation over the selected sample period.",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "µs"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 8,
            "x": 16,
            "y": 93
          },
          "hiddenSeries": false,
          "id": 103,
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
              "expr": "label_replace(sum(irate(mongodb_opLatencies_commands_latency{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])/irate(mongodb_opLatencies_commands_ops{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Operation Execution Times - Avg Ms/Command",
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
              "format": "µs",
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
            "type": "prometheus",
            "uid": "000000010"
          },
          "gridPos": {
            "h": 1,
            "w": 24,
            "x": 0,
            "y": 101
          },
          "id": 106,
          "panels": [],
          "title": "Page Faults",
          "type": "row"
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The average rate of page faults on this process per second over the selected sample period. In non-Windows environments this is hard page faults only.",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "/s"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 24,
            "x": 0,
            "y": 102
          },
          "hiddenSeries": false,
          "id": 107,
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
              "expr": "label_replace(sum(irate(mongodb_extra_info_page_faults{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Page Faults",
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
              "format": "/s",
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
            "type": "prometheus",
            "uid": "000000010"
          },
          "gridPos": {
            "h": 1,
            "w": 24,
            "x": 0,
            "y": 110
          },
          "id": 111,
          "panels": [],
          "title": "Query Executor",
          "type": "row"
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The average rate per second over the selected sample period of index items scanned during queries and query-plan evaluation. This rate is driven by the same value as totalKeysExamined in the output of explain().",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "/s"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 12,
            "x": 0,
            "y": 111
          },
          "hiddenSeries": false,
          "id": 108,
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
              "expr": "label_replace(sum(irate(mongodb_metrics_queryExecutor_scanned{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Query Executor - Scanned",
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
              "format": "/s",
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
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The average rate per second over the selected sample period of documents scanned during queries and query-plan evaluation. This rate is driven by the same value as totalDocsExamined in the output of explain().",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "/s"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 12,
            "x": 12,
            "y": 111
          },
          "hiddenSeries": false,
          "id": 109,
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
              "expr": "label_replace(sum(irate(mongodb_metrics_queryExecutor_scannedObjects{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Query Executor - Scanned Objects",
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
              "format": "/s",
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
            "type": "prometheus",
            "uid": "000000010"
          },
          "gridPos": {
            "h": 1,
            "w": 24,
            "x": 0,
            "y": 119
          },
          "id": 113,
          "panels": [],
          "title": "Queues",
          "type": "row"
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The number of operations queued waiting for any lock",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "none"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 8,
            "x": 0,
            "y": 120
          },
          "hiddenSeries": false,
          "id": 114,
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
              "expr": "label_replace(sum(mongodb_globalLock_currentQueue_total{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Queues - Total",
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
              "format": "none",
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
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The number of operations queued waiting for a read lock",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "none"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 8,
            "x": 8,
            "y": 120
          },
          "hiddenSeries": false,
          "id": 115,
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
              "expr": "label_replace(sum(mongodb_globalLock_currentQueue_readers{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Queues - Readers",
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
              "format": "none",
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
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The number of operations queued waiting for a write lock",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "none"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 8,
            "x": 16,
            "y": 120
          },
          "hiddenSeries": false,
          "id": 116,
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
              "expr": "label_replace(sum(mongodb_globalLock_currentQueue_writers{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Queues - Writers",
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
              "format": "none",
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
            "type": "prometheus",
            "uid": "000000010"
          },
          "gridPos": {
            "h": 1,
            "w": 24,
            "x": 0,
            "y": 128
          },
          "id": 118,
          "panels": [],
          "title": "Scan and Order",
          "type": "row"
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The average rate per second over the selected sample period of queries that return sorted results that cannot perform the sort operation using an index.",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "/s"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 24,
            "x": 0,
            "y": 129
          },
          "hiddenSeries": false,
          "id": 119,
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
              "expr": "label_replace(sum(irate(mongodb_metrics_operation_scanAndOrder{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[$Interval])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Scan and Order",
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
              "format": "/s",
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
            "type": "prometheus",
            "uid": "000000010"
          },
          "gridPos": {
            "h": 1,
            "w": 24,
            "x": 0,
            "y": 137
          },
          "id": 123,
          "panels": [],
          "title": "Tickets Available",
          "type": "row"
        },
        {
          "aliasColors": {},
          "bars": false,
          "dashLength": 10,
          "dashes": false,
          "datasource": {
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The number of read tickets available to the WiredTiger storage engine. Read tickets represent the number of concurrent read operations allowed into the storage engine. When this value reaches zero new read requests may queue until a read ticket becomes available.",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "none"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 12,
            "x": 0,
            "y": 138
          },
          "hiddenSeries": false,
          "id": 120,
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
              "expr": "label_replace(sum(mongodb_wiredTiger_concurrentTransactions_read_available{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Tickets Available - Reads",
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
              "format": "none",
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
            "type": "prometheus",
            "uid": "${DS_THANOS}"
          },
          "description": "The number of write tickets available to the WiredTiger storage engine. Write tickets represent the number of concurrent write operations allowed into the storage engine. When this value reaches zero new write requests may queue until a write ticket becomes available.",
          "fieldConfig": {
            "defaults": {
              "links": [],
              "unit": "none"
            },
            "overrides": []
          },
          "fill": 1,
          "fillGradient": 0,
          "gridPos": {
            "h": 8,
            "w": 12,
            "x": 12,
            "y": 138
          },
          "hiddenSeries": false,
          "id": 121,
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
              "expr": "label_replace(sum(mongodb_wiredTiger_concurrentTransactions_write_available{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
              "interval": "",
              "legendFormat": "{{hostname}}:{{process_port}}",
              "refId": "A",
              "datasource": {
                "type": "prometheus",
                "uid": "${DS_THANOS}"
              }
            }
          ],
          "thresholds": [],
          "timeRegions": [],
          "title": "Tickets Available - Writes",
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
              "format": "none",
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
            "auto": true,
            "auto_count": 30,
            "auto_min": "1m",
            "current": {
              "selected": false,
              "text": "1m",
              "value": "1m"
            },
            "hide": 0,
            "name": "Interval",
            "options": [
              {
                "selected": false,
                "text": "auto",
                "value": "$__auto_interval_Interval"
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
                "text": "1h",
                "value": "1h"
              },
              {
                "selected": false,
                "text": "1d",
                "value": "1d"
              }
            ],
            "query": "30s,1m,5m,1h,1d",
            "queryValue": "",
            "refresh": 2,
            "skipUrlSync": false,
            "type": "interval"
          },
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
            "sort": 5,
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
            "sort": 5,
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
            "label": "ReplicaSet Name",
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
            "sort": 5,
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
            "label": "Host",
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
            "sort": 5,
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
            "sort": 5,
            "tagValuesQuery": "",
            "tagsQuery": "",
            "type": "query",
            "useTags": false
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
      "title": "Dedicated Atlas Clusters - Mongo Metrics",
      "uid": "W0lo7Gx7z",
      "version": 17,
      "weekStart": ""
   }
