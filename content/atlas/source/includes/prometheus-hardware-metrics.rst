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
                 "options": "Time"
               },
               "properties": [
                 {
                   "id": "displayName",
                   "value": "Time"
                 },
                 {
                   "id": "custom.hideFrom.viz",
                   "value": true
                 },
                 {
                   "id": "custom.align"
                 }
               ]
             },
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
                   "id": "custom.hideFrom.viz",
                   "value": true
                 },
                 {
                   "id": "custom.align"
                 }
               ]
             }
           ]
         },
         "gridPos": {
           "h": 3,
           "w": 24,
           "x": 0,
           "y": 1
         },
         "id": 41,
         "options": {
           "cellHeight": "sm",
           "frameIndex": 0,
           "showHeader": true,
           "sortBy": [
             {
               "desc": true,
               "displayName": "Value #A"
             }
           ]
         },
         "pluginVersion": "12.3.1",
         "targets": [
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace( sum(mongodb_up{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by ( group_id, org_id, rs_nm, cl_name), \"hostname\", \"$1\", \"instance\", \"(.*)\")\n",
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
           "y": 9
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
           "y": 9
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
           "y": 16
         },
         "id": 8,
         "panels": [],
         "title": "System Memory",
         "type": "row"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The number of kilobytes of used shared memory (shared between several processes, thus including RAM disks, SYS-V-IPC and BSD like SHMEM)",
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
           "w": 8,
           "x": 0,
           "y": 17
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
             "expr": "label_replace(sum(hardware_system_memory_shared_mem_kilobytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\") * 1024",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}}",
             "refId": "A"
           }
         ],
         "title": "System Memory - Shared",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The number of kilobytes of buffer cache, relatively temporary storage for raw disk blocks",
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
           "w": 8,
           "x": 8,
           "y": 17
         },
         "id": 6,
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
             "expr": "label_replace( sum(hardware_system_memory_buffers_kilobytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\") * 1024",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}}",
             "refId": "A"
           }
         ],
         "title": "System Memory - Buffers",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The number of kilobytes in the page cache.",
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
           "w": 8,
           "x": 16,
           "y": 17
         },
         "id": 11,
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
             "expr": "label_replace (sum(hardware_system_memory_cached_kilobytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\") * 1024",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}}",
             "refId": "A"
           }
         ],
         "title": "System Memory - Cached",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The number of kilobytes of physical memory in use\n",
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
           "w": 8,
           "x": 0,
           "y": 25
         },
         "id": 13,
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
             "expr": "label_replace(\r\n  sum(hardware_system_memory_mem_total_kilobytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance) \r\n  - sum(hardware_system_memory_mem_free_kilobytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance)\r\n  - sum(hardware_system_memory_buffers_kilobytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance)\r\n  - sum(hardware_system_memory_cached_kilobytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance),\r\n  \"hostname\", \"$1\", \"instance\", \"(.*)\"\r\n) * 1024",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}}",
             "refId": "A"
           }
         ],
         "title": "System Memory - Used",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The total amount of swap space in free and used, measured in kilobytes\n",
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
           "w": 8,
           "x": 8,
           "y": 25
         },
         "id": 37,
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
             "expr": "label_replace( sum(hardware_system_memory_swap_total_kilobytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance) - sum(hardware_system_memory_swap_free_kilobytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\") * 1024",
             "interval": "${interval:value}",
             "legendFormat": "swap used for host - {{hostname}}",
             "refId": "A"
           },
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace (sum(hardware_system_memory_swap_free_kilobytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\") * 1024",
             "hide": false,
             "interval": "${interval:value}",
             "legendFormat": "swap free for host - {{hostname}}",
             "refId": "B"
           }
         ],
         "title": "System Memory - Swap",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "An estimate of the number of kilobytes of system memory available for running new applications, without swapping",
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
           "w": 8,
           "x": 16,
           "y": 25
         },
         "id": 15,
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
             "expr": "label_replace( \r\n  sum(hardware_system_memory_mem_available_kilobytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance)\r\n   , \"hostname\", \"$1\", \"instance\", \"(.*)\") * 1024",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}}",
             "refId": "A"
           }
         ],
         "title": "System Memory - Available",
         "type": "timeseries"
       },
       {
         "collapsed": false,
         "gridPos": {
           "h": 1,
           "w": 24,
           "x": 0,
           "y": 33
         },
         "id": 17,
         "panels": [],
         "title": "System CPU",
         "type": "row"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The percentage of time the CPU had something runnable, but the hypervisor chose to run something else. For servers with more than 1 CPU core, this value can exceed 100%.\n",
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
           "h": 7,
           "w": 6,
           "x": 0,
           "y": 34
         },
         "id": 19,
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
             "expr": "label_replace( sum(rate(hardware_system_cpu_steal_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}]) / 10) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}}",
             "refId": "A"
           }
         ],
         "title": "System cpu - steal",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The percentage of time the CPU spent servicing guest, which is included in user. For servers with more than 1 CPU core, this value can exceed 100%.\n",
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
             "min": 0,
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
           "h": 7,
           "w": 6,
           "x": 6,
           "y": 34
         },
         "id": 20,
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
             "expr": "label_replace( sum(rate(hardware_system_cpu_guest_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}]) / 10) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}}",
             "refId": "A"
           }
         ],
         "title": "System cpu - guest",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The percentage of time the CPU spent performing software interrupts. For servers with more than 1 CPU core, this value can exceed 100%.\n",
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
             "min": 0,
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
           "h": 7,
           "w": 6,
           "x": 12,
           "y": 34
         },
         "id": 21,
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
             "expr": "label_replace( sum(rate(hardware_system_cpu_soft_irq_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}]) / 10) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}}",
             "refId": "A"
           }
         ],
         "title": "System cpu - softirq",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The percentage of time the CPU spent performing hardware interrupts. For servers with more than 1 CPU core, this value can exceed 100%.\n",
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
             "min": 0,
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
           "h": 7,
           "w": 6,
           "x": 18,
           "y": 34
         },
         "id": 22,
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
             "expr": "label_replace( sum(rate(hardware_system_cpu_irq_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}]) / 10) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}}",
             "refId": "A"
           }
         ],
         "title": "System cpu - irq",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The percentage of time the CPU spent waiting for IO operations to complete. For servers with more than 1 CPU core, this value can exceed 100%\n",
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
             "min": 0,
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
           "h": 7,
           "w": 6,
           "x": 0,
           "y": 41
         },
         "id": 23,
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
             "expr": "label_replace(sum(rate(hardware_system_cpu_io_wait_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}]) / 10) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}}",
             "refId": "A"
           }
         ],
         "title": "System cpu - iowait",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The percentage of time the CPU spent occupied by all processes with a positive nice value. For servers with more than 1 CPU core, this value can exceed 100%.\n",
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
             "min": 0,
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
           "h": 7,
           "w": 6,
           "x": 6,
           "y": 41
         },
         "id": 24,
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
             "expr": "label_replace( sum(rate(hardware_system_cpu_nice_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}]) / 10) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}}",
             "refId": "A"
           }
         ],
         "title": "System cpu - nice",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The percentage of time the CPU spent servicing operating system calls from all processes. For servers with more than 1 CPU core, this value can exceed 100%.\n",
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
             "min": 0,
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
           "h": 7,
           "w": 6,
           "x": 12,
           "y": 41
         },
         "id": 25,
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
             "expr": "label_replace( sum(rate(hardware_system_cpu_kernel_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}]) / 10) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}}",
             "refId": "A"
           }
         ],
         "title": "System cpu - kernel",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The percentage of time the CPU spent servicing all user applications (not just MongoDB processes). For servers with more than 1 CPU core, this value can exceed 100%.\n",
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
             "min": 0,
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
           "h": 7,
           "w": 6,
           "x": 18,
           "y": 41
         },
         "id": 26,
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
             "expr": "label_replace( sum(rate(hardware_system_cpu_user_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}]) / 10) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}}",
             "refId": "A"
           }
         ],
         "title": "System cpu - user",
         "type": "timeseries"
       },
       {
         "collapsed": false,
         "gridPos": {
           "h": 1,
           "w": 24,
           "x": 0,
           "y": 48
         },
         "id": 44,
         "panels": [],
         "title": "Normalized System Cpu",
         "type": "row"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The percentage of time the CPU had something runnable, but the hypervisor chose to run something else. It is scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
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
             "min": 0,
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
           "h": 7,
           "w": 6,
           "x": 0,
           "y": 49
         },
         "id": 46,
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
             "expr": "label_replace( sum(rate(hardware_system_cpu_steal_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}]) / (10 * hardware_platform_num_logical_cpus{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"})) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}}",
             "refId": "A"
           }
         ],
         "title": "Normalized System cpu - steal",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The percentage of time the CPU spent servicing guest, which is included in user. It is scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
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
             "min": 0,
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
           "h": 7,
           "w": 6,
           "x": 6,
           "y": 49
         },
         "id": 47,
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
             "expr": "label_replace( sum(rate(hardware_system_cpu_guest_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}]) / (10 * hardware_platform_num_logical_cpus{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"})) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}}",
             "refId": "A"
           }
         ],
         "title": "Normalized System cpu - guest",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The percentage of time the CPU spent performing software interrupts. It is scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
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
             "min": 0,
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
           "h": 7,
           "w": 6,
           "x": 12,
           "y": 49
         },
         "id": 48,
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
             "expr": "label_replace( sum(rate(hardware_system_cpu_soft_irq_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}]) / (10 * hardware_platform_num_logical_cpus{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"})) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}}",
             "refId": "A"
           }
         ],
         "title": "Normalized System cpu - softirq",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The percentage of time the CPU spent performing hardware interrupts. It is scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
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
             "min": 0,
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
           "h": 7,
           "w": 6,
           "x": 18,
           "y": 49
         },
         "id": 49,
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
             "expr": "label_replace( sum(rate(hardware_system_cpu_irq_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}]) / (10 * hardware_platform_num_logical_cpus{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"})) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}}",
             "refId": "A"
           }
         ],
         "title": "Normalized System cpu - irq",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The percentage of time the CPU spent waiting for IO operations to complete. It is scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
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
             "min": 0,
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
           "h": 7,
           "w": 6,
           "x": 0,
           "y": 56
         },
         "id": 51,
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
             "expr": "label_replace(sum(rate(hardware_system_cpu_io_wait_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}]) / (10 * hardware_platform_num_logical_cpus{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"})) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}}",
             "refId": "A"
           }
         ],
         "title": "Normalized System cpu - iowait",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The percentage of time the CPU spent occupied by all processes with a positive nice value. It is scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
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
             "min": 0,
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
           "h": 7,
           "w": 6,
           "x": 6,
           "y": 56
         },
         "id": 52,
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
             "expr": "label_replace( sum(rate(hardware_system_cpu_nice_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}]) / (10 * hardware_platform_num_logical_cpus{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"})) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}}",
             "refId": "A"
           }
         ],
         "title": "Normalized System cpu - nice",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The percentage of time the CPU spent servicing operating system calls from all processes. It is scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
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
             "min": 0,
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
           "h": 7,
           "w": 6,
           "x": 12,
           "y": 56
         },
         "id": 53,
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
             "expr": "label_replace( sum(rate(hardware_system_cpu_kernel_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}]) / (10 * hardware_platform_num_logical_cpus{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"})) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}}",
             "refId": "A"
           }
         ],
         "title": "Normalized System cpu - kernel",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The percentage of time the CPU spent servicing all user applications (not just MongoDB processes). It is scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
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
             "min": 0,
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
           "h": 7,
           "w": 6,
           "x": 18,
           "y": 56
         },
         "id": 50,
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
             "expr": "label_replace( sum(rate(hardware_system_cpu_user_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}]) / (10 * hardware_platform_num_logical_cpus{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"})) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}}",
             "refId": "A"
           }
         ],
         "title": "Normalized System cpu - user",
         "type": "timeseries"
       },
       {
         "collapsed": false,
         "gridPos": {
           "h": 1,
           "w": 24,
           "x": 0,
           "y": 63
         },
         "id": 28,
         "panels": [],
         "title": "System Network",
         "type": "row"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average rate of physical bytes received per second by the eth0 network interface\n",
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
             "unit": "binBps"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 9,
           "w": 24,
           "x": 0,
           "y": 64
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
             "editorMode": "code",
             "exemplar": true,
             "expr": "label_replace( sum(rate(hardware_system_network_eth0_bytes_in_bytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}])) by (instance) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "legendFormat": "bytes in - {{hostname}}",
             "range": true,
             "refId": "A"
           },
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "editorMode": "code",
             "expr": "label_replace(sum(rate(hardware_system_network_eth0_bytes_out_bytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}])) by (instance), \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "legendFormat": "bytes out - {{hostname}}",
             "range": true,
             "refId": "B"
           }
         ],
         "title": "Network traffic",
         "type": "timeseries"
       },
       {
         "collapsed": false,
         "gridPos": {
           "h": 1,
           "w": 24,
           "x": 0,
           "y": 73
         },
         "id": 30,
         "panels": [],
         "title": "System Disk",
         "type": "row"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The total bytes of free disk space on the disk partition used by MongoDB.\n",
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
           "w": 6,
           "x": 0,
           "y": 74
         },
         "id": 14,
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
             "expr": "label_replace( sum(hardware_disk_metrics_disk_space_free_bytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance, disk_name) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "disk - {{disk_name}}, host - {{hostname}} ",
             "refId": "A"
           }
         ],
         "title": "System Disk - Free",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The percent of free disk space on the partition used by MongoDB.\n",
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
           "y": 74
         },
         "id": 71,
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
             "expr": "label_replace( sum(hardware_disk_metrics_disk_space_free_bytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"} / (hardware_disk_metrics_disk_space_used_bytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"} + hardware_disk_metrics_disk_space_free_bytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) * 100) by (instance, disk_name) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "disk - {{disk_name}}, host - {{hostname}} ",
             "refId": "A"
           }
         ],
         "title": "System Disk Percent Free",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The total bytes of used disk space on the partition that runs MongoDB.\n",
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
           "w": 6,
           "x": 12,
           "y": 74
         },
         "id": 36,
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
             "expr": "label_replace( sum(hardware_disk_metrics_disk_space_used_bytes{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance, disk_name) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "disk - {{disk_name}} host - {{hostname}} ",
             "refId": "A"
           }
         ],
         "title": "System Disk - Used",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The write throughput of I/O operations per second for the disk partition used for MongoDB.\n",
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
             "unit": "/ sec"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 6,
           "x": 18,
           "y": 74
         },
         "id": 63,
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
             "expr": "label_replace( sum(rate(hardware_disk_metrics_write_count{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}])) by (instance, disk_name) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "hide": false,
             "interval": "${interval:value}",
             "legendFormat": "disk - {{disk_name}} host - {{hostname}} ",
             "refId": "B"
           }
         ],
         "title": "System Disk Write IOPS",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The write latency in milliseconds of the disk partition used by MongoDB.\n",
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
             "unit": "ms"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 6,
           "x": 0,
           "y": 82
         },
         "id": 64,
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
             "expr": "label_replace( sum(rate(hardware_disk_metrics_write_time_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}]) / rate(hardware_disk_metrics_write_count{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}])) by (instance, disk_name), \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "hide": false,
             "interval": "${interval:value}",
             "legendFormat": "disk - {{disk_name}} host - {{hostname}} ",
             "refId": "B"
           }
         ],
         "title": "System Disk Write Latency",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The Read latency in milliseconds of the disk partition used by MongoDB.\n",
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
             "unit": "ms"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 6,
           "x": 6,
           "y": 82
         },
         "id": 65,
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
             "expr": "label_replace( sum(rate(hardware_disk_metrics_read_time_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}]) / rate(hardware_disk_metrics_read_count{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}])) by (instance, disk_name), \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "hide": false,
             "interval": "${interval:value}",
             "legendFormat": "disk - {{disk_name}} host - {{hostname}} ",
             "refId": "B"
           }
         ],
         "title": "System Disk Read Latency",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The read throughput of I/O operations per second for the disk partition used for MongoDB.\n",
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
             "unit": "/ sec"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 6,
           "x": 12,
           "y": 82
         },
         "id": 62,
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
             "expr": "label_replace( sum(rate(hardware_disk_metrics_read_count{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}])) by (instance, disk_name) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "disk - {{disk_name}} host - {{hostname}} ",
             "refId": "A"
           }
         ],
         "title": "System Disk Read IOPS",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The percentage of time during which requests are being issued to and serviced by the partition. This includes requests from any process, not just MongoDB processes.\n",
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
           "x": 18,
           "y": 82
         },
         "id": 67,
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
             "expr": "label_replace( sum(rate(hardware_disk_metrics_total_time_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}]) ) by (instance, disk_name) / 10, \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "hide": false,
             "interval": "${interval:value}",
             "legendFormat": "disk - {{disk_name}} host - {{hostname}} ",
             "refId": "B"
           }
         ],
         "title": "System Disk Util %",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The average length of queue of requests issued to the disk partition used by MongoDB.\n",
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
           "y": 90
         },
         "id": 66,
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
             "expr": "label_replace( sum(rate(hardware_disk_metrics_weighted_time_io_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}]) / 1000) by (instance, DiskName), \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "hide": false,
             "interval": "${interval:value}",
             "legendFormat": "disk - {{disk_name}} host - {{hostname}} ",
             "range": true,
             "refId": "B"
           }
         ],
         "title": "System Disk Queue Depth",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "Disk Read Throughput refers to the rate at which data is read from disk in Megabytes per second, indicating how efficiently the database retrieves data that is not cached in memory.",
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
             "unit": "binBps"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 6,
           "x": 6,
           "y": 90
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
             "editorMode": "code",
             "exemplar": true,
             "expr": "label_replace( sum(hardware_disk_metrics_read_throughput_bytes_per_second{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}) by (instance, disk_name) , \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "disk - {{disk_name}} host - {{hostname}} ",
             "range": true,
             "refId": "A"
           }
         ],
         "title": "System Disk Throughput - read throughput",
         "type": "timeseries"
       },
       {
         "collapsed": false,
         "gridPos": {
           "h": 1,
           "w": 24,
           "x": 0,
           "y": 98
         },
         "id": 32,
         "panels": [],
         "title": "Process CPU",
         "type": "row"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The percentage of time the CPU spent servicing this MongoDB process, scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
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
           "h": 7,
           "w": 6,
           "x": 0,
           "y": 99
         },
         "id": 54,
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
             "expr": "label_replace((sum(rate(hardware_process_cpu_user_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\", process_port=~\"$process_port\" } [${interval:text}])) by (instance, process_port)  / on(instance) group_left  hardware_platform_num_logical_cpus{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\" })/10, \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}} port - {{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Normalized Process cpu - user",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "",
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
           "h": 7,
           "w": 6,
           "x": 6,
           "y": 99
         },
         "id": 58,
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
             "expr": "label_replace((sum(rate(hardware_process_cpu_children_user_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\", process_port=~\"$process_port\" } [${interval:text}])) by (instance, process_port)  / on(instance) group_left  hardware_platform_num_logical_cpus{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\" })/10, \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}} port - {{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Normalized Process cpu - children user",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The percentage of time the CPU spent servicing operating system calls for this MongoDB process, scaled to a range of 0-100% by dividing by the number of CPU cores.\n",
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
           "h": 7,
           "w": 6,
           "x": 12,
           "y": 99
         },
         "id": 55,
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
             "expr": "label_replace((sum(rate(hardware_process_cpu_kernel_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\", process_port=~\"$process_port\" } [${interval:text}])) by (instance, process_port)  / on(instance) group_left  hardware_platform_num_logical_cpus{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\" })/10, \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}} port - {{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Normalized Process cpu - kernel",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "",
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
           "h": 7,
           "w": 6,
           "x": 18,
           "y": 99
         },
         "id": 57,
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
             "expr": "label_replace((sum(rate(hardware_process_cpu_children_kernel_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\", process_port=~\"$process_port\" } [${interval:text}])) by (instance, process_port)  / on(instance) group_left  hardware_platform_num_logical_cpus{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\" })/10, \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}} port - {{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Normalized Process cpu - children kernel",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The percentage of time the CPU spent servicing this MongoDB process. For servers with more than 1 CPU core, this value can exceed 100%.\n",
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
           "h": 7,
           "w": 6,
           "x": 0,
           "y": 106
         },
         "id": 56,
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
             "expr": "label_replace(sum(rate(hardware_process_cpu_user_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\", process_port=~\"$process_port\" } [${interval:text}])) by (instance, process_port)  / 10, \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}} port - {{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Process cpu - user",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "",
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
           "h": 7,
           "w": 6,
           "x": 6,
           "y": 106
         },
         "id": 59,
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
             "expr": "label_replace(sum(rate(hardware_process_cpu_children_user_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\", process_port=~\"$process_port\" } [${interval:text}])) by (instance, process_port)  / 10, \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}} port - {{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Process cpu - child user",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The percentage of time the CPU spent servicing operating system calls for this MongoDB process. For servers with more than 1 CPU core, this value can exceed 100%.\n",
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
           "h": 7,
           "w": 6,
           "x": 12,
           "y": 106
         },
         "id": 60,
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
             "expr": "label_replace(sum(rate(hardware_process_cpu_kernel_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\", process_port=~\"$process_port\" } [${interval:text}])) by (instance, process_port)  / 10, \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}} port - {{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Process cpu - kernel",
         "type": "timeseries"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "",
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
           "h": 7,
           "w": 6,
           "x": 18,
           "y": 106
         },
         "id": 61,
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
             "expr": "label_replace(sum(rate(hardware_process_cpu_children_kernel_milliseconds{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\", process_port=~\"$process_port\" } [${interval:text}])) by (instance, process_port)  / 10, \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "interval": "${interval:value}",
             "legendFormat": "host - {{hostname}} port - {{process_port}}",
             "refId": "A"
           }
         ],
         "title": "Process cpu - children kernel",
         "type": "timeseries"
       },
       {
         "collapsed": false,
         "gridPos": {
           "h": 1,
           "w": 24,
           "x": 0,
           "y": 113
         },
         "id": 69,
         "panels": [],
         "title": "Misc.",
         "type": "row"
       },
       {
         "datasource": {
           "type": "prometheus",
           "uid": "${DS_PROMETHEUS}"
         },
         "description": "The total number of pages swapped in and out per second\n",
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
             "unit": "/ sec"
           },
           "overrides": []
         },
         "gridPos": {
           "h": 8,
           "w": 6,
           "x": 0,
           "y": 114
         },
         "id": 70,
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
             "expr": "label_replace( sum(rate(hardware_system_vm_page_swap_in{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}]) ) by (instance), \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "hide": false,
             "interval": "${interval:value}",
             "legendFormat": "swap in for host - {{hostname}} ",
             "refId": "B"
           },
           {
             "datasource": {
               "type": "prometheus",
               "uid": "${DS_PROMETHEUS}"
             },
             "exemplar": true,
             "expr": "label_replace( sum(rate(hardware_system_vm_page_swap_out{group_id=~\"$group_id\", cl_name=~\"$cl_name\", instance=~\"$host.*\"}[${interval:text}]) ) by (instance), \"hostname\", \"$1\", \"instance\", \"(.*)\")",
             "hide": false,
             "interval": "${interval:value}",
             "legendFormat": "swap out for host - {{hostname}} ",
             "refId": "A"
           }
         ],
         "title": "System VM Swap IO",
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
           "refresh": 1,
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
           "multi": true,
           "name": "host",
           "options": [],
           "query": {
             "query": "label_values(mongodb_up{group_id='$group_id', cl_name='$cl_name',rs_nm='$rs_nm'},instance)",
             "refId": "thanos-host-Variable-Query"
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
     "title": "Dedicated Atlas Clusters - Hardware Metrics",
     "uid": "_s7Pjkb7j",
     "version": 2,
     "weekStart": "",
     "id": null
   }
