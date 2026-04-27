.. code-block:: json

   {
     "__inputs": [
       {
         "name": "DS_PROMETHEUS",
         "label": "prometheus",
         "description": "Select your Prometheus datasource",
         "type": "datasource",
         "pluginId": "prometheus",
         "pluginName": "Prometheus"
       }
     ],
     "__elements": {},
     "__requires": [
       {
         "type": "grafana",
         "id": "grafana",
         "name": "Grafana",
         "version": "12.3.1"
       },
       {
         "type": "datasource",
         "id": "prometheus",
         "name": "Prometheus",
         "version": "1.0.0"
       },
       {
         "type": "panel",
         "id": "state-timeline",
         "name": "State timeline",
         "version": ""
       },
       {
         "type": "panel",
         "id": "table",
         "name": "Table",
         "version": ""
       },
       {
         "type": "panel",
         "id": "timeseries",
         "name": "Time series",
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
     "links": [],
     "panels": [
       {
         "collapsed": false,
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
           "uid": "${DS_PROMETHEUS}"
         },
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "thresholds"
             },
             "custom": {
               "align": "auto",
               "cellOptions": {
                 "type": "auto"
               },
               "footer": {
                 "reducers": []
               },
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
                   "value": 0
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
           "cellHeight": "sm",
           "showHeader": true
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": false,
             "expr": "label_replace( sum(mongodb_info{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (group_id, org_id, rs_nm, cl_name), \"hostname\", \"$1\", \"instance\", \"(.*)\")\n",
             "format": "table",
             "instant": true,
             "interval": "${interval:value}",
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
           "uid": "${DS_PROMETHEUS}"
         },
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "thresholds"
             },
             "custom": {
               "align": "auto",
               "cellOptions": {
                 "type": "auto"
               },
               "footer": {
                 "reducers": []
               },
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
                   "value": 0
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
           "cellHeight": "sm",
           "showHeader": true
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": false,
             "expr": "label_replace( sum(mongodb_info{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance, replica_state_name, process_port, rs_nm, process_type), \"hostname\", \"$1\", \"instance\", \"(.*):.*\")\n",
             "format": "table",
             "instant": true,
             "interval": "${interval:value}",
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
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The RS State for each node at a given time.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisPlacement": "auto",
               "fillOpacity": 70,
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineWidth": 0,
               "spanNulls": false
             },
             "links": [],
             "mappings": [
               {
                 "options": {
                   "0": {
                     "color": "green",
                     "index": 0,
                     "text": "Primary"
                   },
                   "1": {
                     "color": "yellow",
                     "index": 1,
                     "text": "Secondary"
                   }
                 },
                 "type": "value"
               }
             ],
             "max": 1,
             "min": 0,
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 }
               ]
             }
           },
           "overrides": []
         },
         "gridPos": {
           "h": 7,
           "w": 12,
           "x": 0,
           "y": 11
         },
         "id": 134,
         "interval": "${interval:value}",
         "options": {
           "alignValue": "left",
           "legend": {
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "mergeValues": true,
           "rowHeight": 0.9,
           "showValue": "always",
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "editorMode": "code",
             "exemplar": false,
             "expr": "label_replace(\n  sum(\n    mongodb_repl_secondary{\n      group_id=~\"$group_id\",\n      cl_name=~\"$cl_name\",\n      instance=~\"$host.*\"\n    }\n  ) by (instance) > bool 0,\n  \"hostname\", \"$1\", \"instance\", \"(.*)\"\n)",
             "format": "time_series",
             "instant": false,
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "range": true,
             "refId": "A"
           }
         ],
         "title": "ReplicatSet State (Failovers)",
         "type": "state-timeline"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The amount of time the instance has been Up since last restart.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "s"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 7,
           "w": 12,
           "x": 12,
           "y": 11
         },
         "id": 135,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "editorMode": "code",
             "exemplar": true,
             "expr": "label_replace(sum\r\n  (\r\n    mongodb_uptime{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance),\r\n  \"hostname\", \"$1\", \"instance\", \"(.*)\"\r\n)",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "range": true,
             "refId": "A"
           }
         ],
         "title": "Node Uptime (Restarts)",
         "type": "timeseries"
       },
       {
         "collapsed": false,
         "gridPos": {
           "h": 1,
           "w": 24,
           "x": 0,
           "y": 18
         },
         "id": 126,
         "panels": [],
         "title": "Catalog",
         "type": "row"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "Total number of collections across all non-system databases.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 10,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "never",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
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
           "h": 8,
           "w": 6,
           "x": 0,
           "y": 19
         },
         "id": 127,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "multi",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "editorMode": "code",
             "exemplar": true,
             "expr": "label_replace(sum(mongodb_catalogStats_collections{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "range": true,
             "refId": "A"
           }
         ],
         "title": "Catalog - total collections",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "Total number of views across all non-system databases.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 10,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "never",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
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
           "h": 8,
           "w": 6,
           "x": 6,
           "y": 19
         },
         "id": 128,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "multi",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "editorMode": "code",
             "exemplar": true,
             "expr": "label_replace(sum(mongodb_catalogStats_views{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "range": true,
             "refId": "A"
           }
         ],
         "title": "Catalog - total views",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "Total number of indexes across all non-system databases.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 10,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "never",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
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
           "h": 8,
           "w": 6,
           "x": 12,
           "y": 19
         },
         "id": 129,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "multi",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "editorMode": "code",
             "exemplar": true,
             "expr": "label_replace(sum(mongodb_indexStats_count{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "range": true,
             "refId": "A"
           }
         ],
         "title": "Catalog - total indexes",
         "type": "timeseries"
       },
       {
         "collapsed": false,
         "gridPos": {
           "h": 1,
           "w": 24,
           "x": 0,
           "y": 27
         },
         "id": 8,
         "panels": [],
         "title": "Memory",
         "type": "row"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The number of megabytes resident. MMAPv1: It is typical over time, on a dedicated database server, for this number to approach the amount of physical ram on the box. WiredTiger: In a standard deployment resident is the amount of memory used by the WiredTiger cache plus the memory dedicated to other in memory structures used by the mongod process. By default, mongod with WiredTiger reserves 50% of the total physical memory on the server for the cache and at steady state, WiredTiger tries to limit cache usage to 80% of that total. For example, if a server has 16GB of memory, WiredTiger will assume it can use 8GB for cache and at steady state should use about 6.5GB.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 10,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "never",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "bytes"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 12,
           "x": 0,
           "y": 28
         },
         "id": 2,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "multi",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(mongodb_mem_resident{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\") * 1024 * 1024",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Memory - Resident",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The virtual megabytes for the mongod process. MMAPv1: Generally virtual should be a little larger than mapped (or 2x with --journal), but if virtual is many gigabytes larger, it indicates that excessive memory is being used by other aspects than the memory mapping of files -- that would be bad/suboptimal. The most common case of usage of a high amount of memory for non-mapped is that there are very many connections to the database. Each connection has a thread stack and the memory for those stacks can add up to a considerable amount. WiredTiger: Generally virtual should be a little larger than mapped, but if virtual is many gigabytes larger, it indicates that excessive memory is being used by other aspects than the memory mapping of files -- that would be bad/suboptimal. The most common case of usage of a high amount of memory for non-mapped is that there are very many connections to the database. Each connection has a thread stack and the memory for those stacks can add up to a considerable amount.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 10,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "never",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "bytes"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 12,
           "x": 12,
           "y": 28
         },
         "id": 72,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "multi",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(mongodb_mem_virtual{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\") * 1024 * 1024",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Memory - Virtual",
         "type": "timeseries"
       },
       {
         "collapsed": false,
         "gridPos": {
           "h": 1,
           "w": 24,
           "x": 0,
           "y": 36
         },
         "id": 17,
         "panels": [],
         "title": "Asserts",
         "type": "row"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average rate of regular asserts raised per second over the selected sample period\n",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 10,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "never",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "/s"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 6,
           "x": 0,
           "y": 37
         },
         "id": 73,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "multi",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(rate(mongodb_asserts_regular{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Asserts - Regular",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average rate of warnings per second over the selected sample period",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 10,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "never",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "/s"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 6,
           "x": 6,
           "y": 37
         },
         "id": 74,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "multi",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(rate(mongodb_asserts_warning{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Asserts - Warning",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average rate of message asserts per second over the selected sample period. These are internal server errors that have a well defined text string. Stack traces are logged for these",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 10,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "never",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "/s"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 6,
           "x": 12,
           "y": 37
         },
         "id": 75,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "multi",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(rate(mongodb_asserts_msg{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Asserts - Message",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average rate of user asserts per second over the selected sample period. These are errors that can be generated by a user such as out of disk space or duplicate key",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 10,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "never",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "/s"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 6,
           "x": 18,
           "y": 37
         },
         "id": 76,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "multi",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(rate(mongodb_asserts_user{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Asserts - User",
         "type": "timeseries"
       },
       {
         "collapsed": false,
         "gridPos": {
           "h": 1,
           "w": 24,
           "x": 0,
           "y": 45
         },
         "id": 44,
         "panels": [],
         "title": "Cache",
         "type": "row"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average rate of bytes per second read into WiredTiger's cache over the selected sample period.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "binBps"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 6,
           "x": 0,
           "y": 46
         },
         "id": 77,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(rate(mongodb_wiredTiger_cache_bytes_read_into_cache{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Cache Activity - Read Into",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average rate of bytes per second written from WiredTiger's cache over the selected sample period.\n",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "binBps"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 6,
           "x": 6,
           "y": 46
         },
         "id": 78,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(rate(mongodb_wiredTiger_cache_bytes_written_from_cache{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Cache Activity - Write From",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The number of bytes currently in the WiredTiger cache.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "bytes"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 6,
           "x": 12,
           "y": 46
         },
         "id": 79,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(mongodb_wiredTiger_cache_bytes_currently_in_the_cache{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Cache Usage - Used",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The number of tracked dirty bytes currently in the WiredTiger cache.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "bytes"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 6,
           "x": 18,
           "y": 46
         },
         "id": 80,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(mongodb_wiredTiger_cache_tracked_dirty_bytes_in_the_cache{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Cache Usage - Dirty",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "Cache fill ratio measures how full a cache is. It is calculated by dividing the number of bytes currently in the cache by the maximum number of bytes configured, represented as a percentage. A cache fill ratio close to 100% indicates that the query working set is larger than the configured cache size, and increasing the size of the cache could therefore reduce disk I/O.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 10,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "never",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
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
           "x": 0,
           "y": 54
         },
         "id": 125,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "multi",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "editorMode": "code",
             "exemplar": true,
             "expr": "label_replace(\r\n  clamp_max(\r\n    (\r\n      sum(mongodb_wiredTiger_cache_bytes_currently_in_the_cache{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\", process_port=~\"$process_port\"}) by (instance, process_port) \r\n      / \r\n      sum(mongodb_wiredTiger_cache_maximum_bytes_configured{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\", process_port=~\"$process_port\"}) by (instance, process_port)\r\n    ) * 100,\r\n    100\r\n  ),\r\n  \"hostname\", \"$1\", \"instance\", \"(.*)\"\r\n)",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "range": true,
             "refId": "A"
           }
         ],
         "title": "Cache Ratio - Fill Ratio",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "Dirty fill ratio represents the proportion of dirty bytes (pages modified in memory but not yet written to disk) relative to the total cache. A high dirty fill ratio suggests that a significant amount of data is waiting to be flushed to disk, which can impact performance if not managed properly. This metric is important when monitoring write-heavy workloads to ensure data durability.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 10,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "never",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
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
           "y": 54
         },
         "id": 124,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "multi",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "editorMode": "code",
             "exemplar": true,
             "expr": "label_replace(\r\n  clamp_max(\r\n    (\r\n      sum(mongodb_wiredTiger_cache_tracked_dirty_bytes_in_the_cache{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\", process_port=~\"$process_port\"}) by (instance, process_port) \r\n      / \r\n      sum(mongodb_wiredTiger_cache_maximum_bytes_configured{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\", process_port=~\"$process_port\"}) by (instance, process_port)\r\n    ) * 100,\r\n    100\r\n  ),\r\n  \"hostname\", \"$1\", \"instance\", \"(.*)\"\r\n)",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "range": true,
             "refId": "A"
           }
         ],
         "title": "Cache Ratio - Dirty Fill Ratio",
         "type": "timeseries"
       },
       {
         "collapsed": false,
         "gridPos": {
           "h": 1,
           "w": 24,
           "x": 0,
           "y": 62
         },
         "id": 28,
         "panels": [],
         "title": "Connections",
         "type": "row"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The number of currently active connections to this server. A stack is allocated per connection; thus very many connections can result in significant RAM usage.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
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
           "h": 9,
           "w": 24,
           "x": 0,
           "y": 63
         },
         "id": 81,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(mongodb_connections_current{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Connections - Current",
         "type": "timeseries"
       },
       {
         "collapsed": false,
         "gridPos": {
           "h": 1,
           "w": 24,
           "x": 0,
           "y": 72
         },
         "id": 30,
         "panels": [],
         "title": "Cursors",
         "type": "row"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The number of cursors that the server is maintaining for clients. Because MongoDB exhausts unused cursors, typically this value is small or zero. However, if there is a queue, stale tailable cursors, or a large number of operations this value may rise.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
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
           "h": 8,
           "w": 13,
           "x": 0,
           "y": 73
         },
         "id": 82,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(mongodb_metrics_cursor_open_total{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Cursors - Total Open",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average rate of cursors that have timed out per second over the selected sample period",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
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
           "h": 8,
           "w": 11,
           "x": 13,
           "y": 73
         },
         "id": 83,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(mongodb_metrics_cursor_timedOut{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Cursors - Timed Out",
         "type": "timeseries"
       },
       {
         "collapsed": false,
         "gridPos": {
           "h": 1,
           "w": 24,
           "x": 0,
           "y": 81
         },
         "id": 32,
         "panels": [],
         "title": "Document Metrics",
         "type": "row"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average rate per second of documents returned by queries over the selected sample period.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "/s"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 6,
           "x": 0,
           "y": 82
         },
         "id": 84,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(rate(mongodb_metrics_document_returned{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Document Metrics - Returned",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average rate per second of documents inserted over the selected sample period.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "/s"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 6,
           "x": 6,
           "y": 82
         },
         "id": 87,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(rate(mongodb_metrics_document_inserted{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Document Metrics - Inserted",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average rate per second of documents updated over the selected sample period.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "/s"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 6,
           "x": 12,
           "y": 82
         },
         "id": 86,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(rate(mongodb_metrics_document_updated{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Document Metrics - Updated",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average rate per second of documents deleted over the selected sample period.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "/s"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 6,
           "x": 18,
           "y": 82
         },
         "id": 85,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(rate(mongodb_metrics_document_deleted{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Document Metrics - Deleted",
         "type": "timeseries"
       },
       {
         "collapsed": false,
         "gridPos": {
           "h": 1,
           "w": 24,
           "x": 0,
           "y": 90
         },
         "id": 69,
         "panels": [],
         "title": "Network",
         "type": "row"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average rate of requests sent to this database server per second over the selected sample period",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "/s"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 8,
           "x": 0,
           "y": 91
         },
         "id": 88,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(rate(mongodb_network_numRequests{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Network - Num Requests",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average rate of physical (after any wire compression) bytes sent to this database server per second over the selected sample period",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "binBps"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 16,
           "x": 8,
           "y": 91
         },
         "id": 90,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(rate(mongodb_network_bytesIn{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "bytes in - {{hostname}}:{{process_port}}",
             "refId": "A"
           },
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "expr": "label_replace(sum(rate(mongodb_network_bytesOut{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "legendFormat": "bytes out - {{hostname}}:{{process_port}}",
             "refId": "B"
           }
         ],
         "title": "Network - Bytes In/Out",
         "type": "timeseries"
       },
       {
         "collapsed": false,
         "gridPos": {
           "h": 1,
           "w": 24,
           "x": 0,
           "y": 99
         },
         "id": 93,
         "panels": [],
         "title": "Opcounters",
         "type": "row"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average rate of commands performed per second over the selected sample period",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "/s"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 8,
           "x": 0,
           "y": 100
         },
         "id": 96,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(rate(mongodb_opcounters_command{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Opcounters - Command",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average rate of queries performed per second over the selected sample period",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "/s"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 8,
           "x": 8,
           "y": 100
         },
         "id": 101,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(rate(mongodb_opcounters_query{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Opcounters - Query",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average rate of updates performed per second over the selected sample period",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "/s"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 8,
           "x": 16,
           "y": 100
         },
         "id": 100,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(rate(mongodb_opcounters_update{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Opcounters - Update",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average rate of deletes performed per second over the selected sample period",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "/s"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 8,
           "x": 0,
           "y": 108
         },
         "id": 99,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(rate(mongodb_opcounters_delete{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Opcounters - Delete",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average rate of getMores performed per second on any cursor over the selected sample period. On a primary, this number can be high even if the query count is low as the secondaries \"getMore\" from the primary often as part of replication.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "/s"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 8,
           "x": 8,
           "y": 108
         },
         "id": 97,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(rate(mongodb_opcounters_getmore{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Opcounters - Getmore",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average rate of inserts performed per second over the selected sample period",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "/s"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 8,
           "x": 16,
           "y": 108
         },
         "id": 98,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(rate(mongodb_opcounters_insert{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Opcounters - Insert",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average rate of TTL deletes performed per second over the selected sample period. TTL deletes only apply to the primary member of a replica set. TTL deletes do not apply to secondaries, as these deletions are replicated to secondary replica set members. History of previous primary hosts TTL deletes are maintained on the originating primary.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "/s"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 8,
           "x": 0,
           "y": 116
         },
         "id": 130,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(rate(mongodb_metrics_ttl_deletedDocuments{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Opcounters - TTL Deleted",
         "type": "timeseries"
       },
       {
         "collapsed": false,
         "gridPos": {
           "h": 1,
           "w": 24,
           "x": 0,
           "y": 124
         },
         "id": 95,
         "panels": [],
         "title": "Operation Execution Times",
         "type": "row"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average execution time in milliseconds per read operation over the selected sample period.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "µs"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 8,
           "x": 0,
           "y": 125
         },
         "id": 102,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(rate(mongodb_opLatencies_reads_latency{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])/rate(mongodb_opLatencies_reads_ops{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Operation Execution Times - Avg Ms/Read",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average execution time in milliseconds per write operation over the selected sample period.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "µs"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 8,
           "x": 8,
           "y": 125
         },
         "id": 104,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(rate(mongodb_opLatencies_writes_latency{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])/rate(mongodb_opLatencies_writes_ops{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Operation Execution Times - Avg Ms/Write",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average execution time in milliseconds per command operation over the selected sample period.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "µs"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 8,
           "x": 16,
           "y": 125
         },
         "id": 103,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(rate(mongodb_opLatencies_commands_latency{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])/rate(mongodb_opLatencies_commands_ops{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Operation Execution Times - Avg Ms/Command",
         "type": "timeseries"
       },
       {
         "collapsed": false,
         "gridPos": {
           "h": 1,
           "w": 24,
           "x": 0,
           "y": 133
         },
         "id": 106,
         "panels": [],
         "title": "Page Faults",
         "type": "row"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average rate of page faults on this process per second over the selected sample period. In non-Windows environments this is hard page faults only.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "/s"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 24,
           "x": 0,
           "y": 134
         },
         "id": 107,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(rate(mongodb_extra_info_page_faults{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Page Faults",
         "type": "timeseries"
       },
       {
         "collapsed": false,
         "gridPos": {
           "h": 1,
           "w": 24,
           "x": 0,
           "y": 142
         },
         "id": 111,
         "panels": [],
         "title": "Query Executor",
         "type": "row"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average rate per second over the selected sample period of index items scanned during queries and query-plan evaluation. This rate is driven by the same value as totalKeysExamined in the output of explain().",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "/s"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 12,
           "x": 0,
           "y": 143
         },
         "id": 108,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(rate(mongodb_metrics_queryExecutor_scanned{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Query Executor - Scanned",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average rate per second over the selected sample period of documents scanned during queries and query-plan evaluation. This rate is driven by the same value as totalDocsExamined in the output of explain().",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "/s"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 12,
           "x": 12,
           "y": 143
         },
         "id": 109,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(rate(mongodb_metrics_queryExecutor_scannedObjects{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Query Executor - Scanned Objects",
         "type": "timeseries"
       },
       {
         "collapsed": false,
         "gridPos": {
           "h": 1,
           "w": 24,
           "x": 0,
           "y": 151
         },
         "id": 113,
         "panels": [],
         "title": "Queues",
         "type": "row"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The number of operations queued waiting for any lock",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
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
           "h": 8,
           "w": 8,
           "x": 0,
           "y": 152
         },
         "id": 114,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(mongodb_globalLock_currentQueue_total{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Queues - Total",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The number of operations queued waiting for a read lock",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
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
           "h": 8,
           "w": 8,
           "x": 8,
           "y": 152
         },
         "id": 115,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(mongodb_globalLock_currentQueue_readers{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Queues - Readers",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The number of operations queued waiting for a write lock",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
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
           "h": 8,
           "w": 8,
           "x": 16,
           "y": 152
         },
         "id": 116,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(mongodb_globalLock_currentQueue_writers{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Queues - Writers",
         "type": "timeseries"
       },
       {
         "collapsed": false,
         "gridPos": {
           "h": 1,
           "w": 24,
           "x": 0,
           "y": 160
         },
         "id": 118,
         "panels": [],
         "title": "Sorting",
         "type": "row"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average rate per second over the selected sample period of queries that return sorted results that cannot perform the sort operation using an index.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "/s"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 12,
           "x": 0,
           "y": 161
         },
         "id": 119,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(rate(mongodb_metrics_operation_scanAndOrder{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}[${interval:text}])) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Scan and Order",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The total number of writes to disk caused by sort stages. A high number can be due to resource-intensive queries that are performing a collection scan and are using a $sort stage. These resource-intensive queries result in temporary file creation that exceed available memory and utilize disk space for sorting. Identify offending queries in the Query Profiler by looking for collection scans with a $sort stage around the same time the database experiences an increase in disk usage.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "/s"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 12,
           "x": 12,
           "y": 161
         },
         "id": 131,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(\r\n  sum(mongodb_metrics_query_sort_spillToDisk{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\", process_port=~\"$process_port\"}) by (instance, process_port),\r\n  \"hostname\", \"$1\", \"instance\", \"(.*)\"\r\n)",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "spill to disk during sort",
         "type": "timeseries"
       },
       {
         "collapsed": false,
         "gridPos": {
           "h": 1,
           "w": 24,
           "x": 0,
           "y": 169
         },
         "id": 123,
         "panels": [],
         "title": "Tickets Available",
         "type": "row"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The number of read tickets available to the WiredTiger storage engine. Read tickets represent the number of concurrent read operations allowed into the storage engine. When this value reaches zero new read requests may queue until a read ticket becomes available.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
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
           "h": 8,
           "w": 12,
           "x": 0,
           "y": 170
         },
         "id": 120,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(mongodb_queues_execution_read_available{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Tickets Available - Reads",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The number of write tickets available to the WiredTiger storage engine. Write tickets represent the number of concurrent write operations allowed into the storage engine. When this value reaches zero new write requests may queue until a write ticket becomes available.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
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
           "h": 8,
           "w": 12,
           "x": 12,
           "y": 170
         },
         "id": 121,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(sum(mongodb_queues_execution_write_available{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\",  process_port=~\"$process_port\"}) by (instance, process_port) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Tickets Available - Writes",
         "type": "timeseries"
       },
       {
         "collapsed": false,
         "gridPos": {
           "h": 1,
           "w": 24,
           "x": 0,
           "y": 178
         },
         "id": 132,
         "panels": [],
         "title": "Replication",
         "type": "row"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The approximate number of hours available in the replication oplog for the sync source (in most cases, the primary). If a secondary is behind real-time by more than this amount, it cannot catch up and will require a full resync.",
         "fieldConfig": {
           "defaults": {
             "color": {
               "mode": "palette-classic"
             },
             "custom": {
               "axisBorderShow": false,
               "axisCenteredZero": false,
               "axisColorMode": "text",
               "axisLabel": "",
               "axisPlacement": "auto",
               "barAlignment": 0,
               "barWidthFactor": 0.6,
               "drawStyle": "line",
               "fillOpacity": 0,
               "gradientMode": "none",
               "hideFrom": {
                 "legend": false,
                 "tooltip": false,
                 "viz": false
               },
               "insertNulls": false,
               "lineInterpolation": "linear",
               "lineWidth": 1,
               "pointSize": 5,
               "scaleDistribution": {
                 "type": "linear"
               },
               "showPoints": "auto",
               "showValues": false,
               "spanNulls": false,
               "stacking": {
                 "group": "A",
                 "mode": "none"
               },
               "thresholdsStyle": {
                 "mode": "off"
               }
             },
             "links": [],
             "mappings": [],
             "thresholds": {
               "mode": "absolute",
               "steps": [
                 {
                   "color": "green",
                   "value": 0
                 },
                 {
                   "color": "red",
                   "value": 80
                 }
               ]
             },
             "unit": "days"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 12,
           "x": 0,
           "y": 179
         },
         "id": 133,
         "interval": "${interval:value}",
         "options": {
           "alertThreshold": true,
           "legend": {
             "calcs": [],
             "displayMode": "list",
             "placement": "bottom",
             "showLegend": true
           },
           "tooltip": {
             "hideZeros": false,
             "mode": "single",
             "sort": "none"
           }
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace(\r\n  (\r\n    mongodb_oplog_latestOptime{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\", process_port=~\"$process_port\"}\r\n    - on(instance, process_port) \r\n    mongodb_oplog_earliestOptime{group_id=~\"$group_id\", cl_name=~\"$cl_name\", rs_nm=~\"$rs_nm\", instance=~\"$host.*\", process_port=~\"$process_port\"}\r\n  ) / 60 / 60 / 24,\r\n  \"hostname\", \"$1\", \"instance\", \"(.*)\"\r\n)",
             "interval": "${interval:value}",
             "legendFormat": "{{hostname}}:{{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Replication Oplog Window",
         "type": "timeseries"
       }
     ],
     "preload": false,
     "refresh": "",
     "schemaVersion": 42,
     "tags": [],
     "templating": {
       "list": [
         {
           "current": {},
           "datasource": {
             "type": "prometheus",
             "uid": "${DS_PROMETHEUS}"
           },
           "definition": "label_values(mongodb_up, job)",
           "includeAll": false,
           "name": "job",
           "options": [],
           "query": {
             "query": "label_values(mongodb_up, job)",
             "refId": "thanos-job-Variable-Query"
           },
           "refresh": 2,
           "regex": "",
           "type": "query"
         },
         {
           "current": {},
           "datasource": {
             "type": "prometheus",
             "uid": "${DS_PROMETHEUS}"
           },
           "definition": "label_values(mongodb_up{job=\"$job\"}, group_id)",
           "includeAll": false,
           "label": "Group Id",
           "name": "group_id",
           "options": [],
           "query": {
             "query": "label_values(mongodb_up{job=\"$job\"}, group_id)",
             "refId": "thanos-group_id-Variable-Query"
           },
           "refresh": 1,
           "regex": "",
           "sort": 5,
           "type": "query"
         },
         {
           "current": {},
           "datasource": {
             "type": "prometheus",
             "uid": "${DS_PROMETHEUS}"
           },
           "definition": "label_values(mongodb_up{group_id='$group_id'}, cl_name)",
           "includeAll": false,
           "label": "Cluster Name",
           "name": "cl_name",
           "options": [],
           "query": {
             "query": "label_values(mongodb_up{group_id='$group_id'}, cl_name)",
             "refId": "thanos-cl_name-Variable-Query"
           },
           "refresh": 2,
           "regex": "",
           "sort": 5,
           "type": "query"
         },
         {
           "current": {},
           "datasource": {
             "type": "prometheus",
             "uid": "${DS_PROMETHEUS}"
           },
           "definition": "label_values(mongodb_up{group_id='$group_id', cl_name='$cl_name'}, rs_nm)",
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
           "sort": 5,
           "type": "query"
         },
         {
           "current": {},
           "datasource": {
             "type": "prometheus",
             "uid": "${DS_PROMETHEUS}"
           },
           "definition": "label_values(mongodb_up{group_id='$group_id', cl_name='$cl_name',rs_nm='$rs_nm'},instance)",
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
           "sort": 5,
           "type": "query"
         },
         {
           "current": {},
           "datasource": {
             "type": "prometheus",
             "uid": "${DS_PROMETHEUS}"
           },
           "definition": "label_values(mongodb_up{group_id='$group_id', cl_name='$cl_name',rs_nm='$rs_nm'},process_port)",
           "description": "Only applicable for process level metrics",
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
           "sort": 5,
           "type": "query"
         },
         {
           "allowCustomValue": true,
           "current": {
             "text": "1m",
             "value": "1m"
           },
           "description": "Controls the rate window and derived step interval.\nAdjust options to match your Prometheus scrape interval (for example, if your scrape interval is 60s, remove the 15s–1m entries).",
           "label": "Interval",
           "name": "interval",
           "options": [
             {
               "selected": false,
               "text": "45s",
               "value": "15s"
             },
             {
               "selected": true,
               "text": "1m",
               "value": "1m"
             },
             {
               "selected": true,
               "text": "3m",
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
           "query": "45s : 15s, 1m : 1m, 3m : 1m, 5m : 5m, 1h : 1h, 1d : 1d",
           "type": "custom"
         }
       ]
     },
     "time": {
       "from": "now-6h",
       "to": "now"
     },
     "timepicker": {},
     "timezone": "",
     "title": "Dedicated Atlas Clusters - Mongo Metrics",
     "uid": "W0lo7Gx7j",
     "version": 2,
     "weekStart": "",
     "id": null
   }
