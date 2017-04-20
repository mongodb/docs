import React from 'react'
import ReactDOM from 'react-dom'

import Facet from './facet.js'
import Navbar from './navbar.js'
import TutorialList from './tutorialList.js'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchResults: null,
      options: [
        { name: "MongoDB", facet: 'product', active: false },
        { name: "Atlas", facet: 'product', active: false },
        { name: "Cloud Manager", facet: 'product', active: false },
        { name: "Ops Manager", facet: 'product', active: false },
        { name: "BI Connector", facet: 'product', active: false },
        { name: "Spark Connector", facet: 'product', active: false },
        { name: "Mongo Shell", facet: 'language', active: false },
        { name: "Python", facet: 'language', active: false },
        { name: "Java", facet: 'language', active: false },
        { name: "Node.js", facet: 'language', active: false },
        { name: "PHP", facet: 'language', active: false },
        { name: "C", facet: 'language', active: false },
        { name: "C++ 11", facet: 'language', active: false },
        { name: "C#", facet: 'language', active: false },
        { name: "Perl", facet: 'language', active: false },
        { name: "Ruby", facet: 'language', active: false },
        { name: "CRUD", facet: 'topic', active: false },
        { name: "Aggregation", facet: 'topic', active: false },
        { name: "Administration", facet: 'topic', active: false },
        { name: "Security", facet: 'topic', active: false },
        { name: "Replication", facet: 'topic', active: false },
        { name: "Sharding", facet: 'topic', active: false },
      ],
      tutorials: [
        { 
          title: '2.6-downgrade',
          url: '/2.6-downgrade',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: '2.6-upgrade',
          url: '/2.6-upgrade',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: '2.6-upgrade-authorization',
          url: '/2.6-upgrade-authorization',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: '3.0-downgrade',
          url: '/3.0-downgrade',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: '3.0-scram',
          url: '/3.0-scram',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: '3.0-upgrade',
          url: '/3.0-upgrade',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: '3.2-downgrade',
          url: '/3.2-downgrade',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: '3.2-upgrade',
          url: '/3.2-upgrade',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: '3.4-downgrade-replica-set',
          url: '/3.4-downgrade-replica-set',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: '3.4-downgrade-sharded-cluster',
          url: '/3.4-downgrade-sharded-cluster',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: '3.4-downgrade-standalone',
          url: '/3.4-downgrade-standalone',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: '3.4-upgrade-replica-set',
          url: '/3.4-upgrade-replica-set',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: '3.4-upgrade-sharded-cluster',
          url: '/3.4-upgrade-sharded-cluster',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: '3.4-upgrade-standalone',
          url: '/3.4-upgrade-standalone',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'adjust-replica-set-member-priority',
          url: '/adjust-replica-set-member-priority',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'authenticate-nativeldap-activedirectory',
          url: '/authenticate-nativeldap-activedirectory',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'backup-sharded-cluster-with-database-dumps',
          url: '/backup-sharded-cluster-with-database-dumps',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'backup-sharded-cluster-with-filesystem-snapshots',
          url: '/backup-sharded-cluster-with-filesystem-snapshots',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'backup-with-filesystem-snapshots',
          url: '/backup-with-filesystem-snapshots',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'change-config-server-wiredtiger',
          url: '/change-config-server-wiredtiger',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'change-own-password-and-custom-data',
          url: '/change-own-password-and-custom-data',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'change-replica-set-wiredtiger',
          url: '/change-replica-set-wiredtiger',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'change-standalone-wiredtiger',
          url: '/change-standalone-wiredtiger',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'clear-jumbo-flag',
          url: '/clear-jumbo-flag',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'configure-fips',
          url: '/configure-fips',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'configure-ldap-sasl-activedirectory',
          url: '/configure-ldap-sasl-activedirectory',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'configure-ldap-sasl-openldap',
          url: '/configure-ldap-sasl-openldap',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'configure-secondary-only-replica-set-member',
          url: '/configure-secondary-only-replica-set-member',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'connect-to-mongodb-python',
          url: '/connect-to-mongodb-python',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'connect-to-mongodb-shell',
          url: '/connect-to-mongodb-shell',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'control-access-to-mongodb-windows-with-kerberos-authentication',
          url: '/control-access-to-mongodb-windows-with-kerberos-authentication',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'control-access-to-mongodb-with-kerberos-authentication',
          url: '/control-access-to-mongodb-with-kerberos-authentication',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'convert-replica-set-to-replicated-shard-cluster',
          url: '/convert-replica-set-to-replicated-shard-cluster',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'deploy-geographically-distributed-replica-set',
          url: '/deploy-geographically-distributed-replica-set',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'deploy-replica-set',
          url: '/deploy-replica-set',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'deploy-replica-set-with-keyfile-access-control',
          url: '/deploy-replica-set-with-keyfile-access-control',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'deploy-shard-cluster',
          url: '/deploy-shard-cluster',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'deploy-sharded-cluster-hashed-sharding',
          url: '/deploy-sharded-cluster-hashed-sharding',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'deploy-sharded-cluster-ranged-sharding',
          url: '/deploy-sharded-cluster-ranged-sharding',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'deploy-sharded-cluster-with-keyfile-access-control',
          url: '/deploy-sharded-cluster-with-keyfile-access-control',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'enable-authentication',
          url: '/enable-authentication',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'enforce-keyfile-access-control-in-existing-replica-set',
          url: '/enforce-keyfile-access-control-in-existing-replica-set',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'enforce-keyfile-access-control-in-existing-replica-set-without-downtime',
          url: '/enforce-keyfile-access-control-in-existing-replica-set-without-downtime',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'enforce-keyfile-access-control-in-existing-sharded-cluster',
          url: '/enforce-keyfile-access-control-in-existing-sharded-cluster',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'install-mongodb-enterprise-on-amazon',
          url: '/install-mongodb-enterprise-on-amazon',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'install-mongodb-enterprise-on-debian',
          url: '/install-mongodb-enterprise-on-debian',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'install-mongodb-enterprise-on-linux',
          url: '/install-mongodb-enterprise-on-linux',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'install-mongodb-enterprise-on-os-x',
          url: '/install-mongodb-enterprise-on-os-x',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'install-mongodb-enterprise-on-red-hat',
          url: '/install-mongodb-enterprise-on-red-hat',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'install-mongodb-enterprise-on-suse',
          url: '/install-mongodb-enterprise-on-suse',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'install-mongodb-enterprise-on-ubuntu',
          url: '/install-mongodb-enterprise-on-ubuntu',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'install-mongodb-enterprise-on-windows',
          url: '/install-mongodb-enterprise-on-windows',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'install-mongodb-on-amazon',
          url: '/install-mongodb-on-amazon',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'install-mongodb-on-debian',
          url: '/install-mongodb-on-debian',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'install-mongodb-on-linux',
          url: '/install-mongodb-on-linux',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'install-mongodb-on-os-x',
          url: '/install-mongodb-on-os-x',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'install-mongodb-on-red-hat',
          url: '/install-mongodb-on-red-hat',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'install-mongodb-on-suse',
          url: '/install-mongodb-on-suse',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'install-mongodb-on-ubuntu',
          url: '/install-mongodb-on-ubuntu',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'install-mongodb-on-windows',
          url: '/install-mongodb-on-windows',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'kerberos-auth-activedirectory-authz',
          url: '/kerberos-auth-activedirectory-authz',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'manage-sharded-cluster-balancer',
          url: '/manage-sharded-cluster-balancer',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'manage-users-and-roles',
          url: '/manage-users-and-roles',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'migrate-sharded-cluster-to-new-hardware',
          url: '/migrate-sharded-cluster-to-new-hardware',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'monitor-with-snmp',
          url: '/monitor-with-snmp',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'monitor-with-snmp-on-windows',
          url: '/monitor-with-snmp-on-windows',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'perform-findAndModify-linearizable-reads',
          url: '/perform-findAndModify-linearizable-reads',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'perform-maintence-on-replica-set-members',
          url: '/perform-maintence-on-replica-set-members',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'perform-two-phase-commits',
          url: '/perform-two-phase-commits',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'recover-data-following-unexpected-shutdown',
          url: '/recover-data-following-unexpected-shutdown',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'replace-config-server',
          url: '/replace-config-server',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'restore-replica-set-from-backup',
          url: '/restore-replica-set-from-backup',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'restore-sharded-cluster',
          url: '/restore-sharded-cluster',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'rotate-log-files',
          url: '/rotate-log-files',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'sharding-high-availability-writes',
          url: '/sharding-high-availability-writes',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'sharding-segmenting-data-by-location',
          url: '/sharding-segmenting-data-by-location',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'sharding-segmenting-shards',
          url: '/sharding-segmenting-shards',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'sharding-tiered-hardware-for-varying-slas',
          url: '/sharding-tiered-hardware-for-varying-slas',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'text-search-with-rlp',
          url: '/text-search-with-rlp',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'transparent-huge-pages',
          url: '/transparent-huge-pages',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
        { 
          title: 'verify-mongodb-packages',
          url: '/verify-mongodb-packages',
          snippet: "Snippet…Activated charcoal irony cliche direct trade, echo park trust fund austin la croix man bun heirloom butcher gastropub four dollar toast locavore prism. Get familiar:...",
          options: [ 
            { facet: 'product', name: 'MongoDB' },
            { facet: 'language', name: 'Python' },
          ]
        },
      ],
    }

    this.updateFacet = this.updateFacet.bind(this)
    this.clearFacets = this.clearFacets.bind(this)
  }

  clearFacets () {
    const options = this.state.options.map(option => {
      option.active = false
      return option
    })

    this.setState({ options })
  }

  updateFacet (event) {
    const optionName = event.target.innerHTML

    const index = this.state.options.findIndex(option => option.name == optionName)

    let options = this.state.options
    let option = options[index]
    option.active = !option.active

    options = [
      ...options.slice(0, index),
      option,
      ...options.slice(index + 1, options.length)
    ]

    this.setState({ options })
  }

  onResults = (results) => {
    this.setState({searchResults: results})
  }

  render () {
    // TODO: This should be possible with reduce
    let facetNames = []
    this.state.options.map(option => {
      if (facetNames.indexOf(option.facet) == -1) {
        facetNames = [
          ...facetNames,
          option.facet
        ]
      }
    })

    const facets = facetNames.map((facet, i) => {
      const options = this.state.options.filter(o => o.facet == facet)
      return <Facet key={i} name={facet} options={options} updateFacet={this.updateFacet} />
    })

    const activeOptions = this.state.options.filter(option => option.active)
      .map(option => {
        return { facet: option.facet, name: option.name } // remove active field for stringification
      })

    const tutorialsMatchingFacets = this.state.tutorials.filter(tutorial => {
      let shouldInclude = true // by default show all the tutorials

      activeOptions.map(option => {
        const stringifiedOptions = tutorial.options.map(option => JSON.stringify(option))

        if (stringifiedOptions.indexOf(JSON.stringify(option)) == -1) {
          shouldInclude = false
        }
      })

      return shouldInclude
    })

    let tutorials = tutorialsMatchingFacets
    if (this.state.searchResults !== null) {
      const tutorialsSet = new Set(tutorialsMatchingFacets.map(tutorial => tutorial.url))
      tutorials = this.state.searchResults.filter(slug => {
        return tutorialsSet.has(slug)
      })
    }

    return (
      <div>
        <Navbar onResults={this.onResults} />

        <div className="main">
          <aside className="main__sidebar">
            <div className="filter-header">
              <h5 className="filter-header__title">Filters</h5>
              <a onClick={this.clearFacets}><h5 className="filter-header__clear">X Clear Filters</h5></a>
            </div>
            <div className="filters">
              { facets }
            </div>
          </aside>

          <div className="main__content">
            <h1 className="main__title">Tutorials</h1>
            <TutorialList tutorials={ tutorials } />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
