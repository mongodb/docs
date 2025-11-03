import CDriverData from '../docset-data/c-driver';
import CppDriverData from '../docset-data/cpp-driver';
import CsharpDriverData from '../docset-data/csharp-driver';
import DjangoDriverData from '../docset-data/django';
import EntityDriverData from '../docset-data/entity-framework';
import GoDriverData from '../docset-data/golang-drivers';
import HibernateExtData from "../docset-data/hibernate";
import JavaDriverData from '../docset-data/java-driver';
import JavarsDriverData from '../docset-data/java-rs';
import KotlinDriverData from '../docset-data/kotlin-coroutine';
import KotlinSyncDriverData from '../docset-data/kotlin-sync-driver';
import LaravelDriverData from '../docset-data/laravel-drivers';
import MongoidDriverData from '../docset-data/mongoid';
import NodeDriverData from '../docset-data/node-driver';
import PHPLibraryData from '../docset-data/php-library-driver';
import PymongoArrowDriverData from '../docset-data/pymongo-arrow-driver';
import PymongoDriverData from '../docset-data/pymongo-driver';
import RubyDriverData from '../docset-data/ruby-driver';
import RustDriverData from '../docset-data/rust-driver';
import ScalaDriverData from '../docset-data/scala-driver';
import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Client Libraries',
    contentSite: 'drivers',
    group: true,
    items: [
      {
        label: 'C',
        contentSite: 'landing',
        url: '/docs/languages/c/',
        showSubNav: true,
        items: CDriverData,
      },
      {
        label: 'C++',
        contentSite: 'landing',
        url: '/docs/languages/cpp/',
        showSubNav: true,
        items: CppDriverData,
      },
      {
        label: 'C#',
        contentSite: 'landing',
        url: '/docs/languages/csharp/',
        collapsible: true,
        items: [
          {
            label: 'C#/.NET Driver',
            contentSite: 'csharp',
            url: '/docs/drivers/csharp/current/',
            showSubNav: true,
            items: CsharpDriverData,
          },
          {
            label: 'Entity Framework Provider',
            contentSite: 'entity-framework',
            url: '/docs/entity-framework/current/',
            showSubNav: true,
            items: EntityDriverData,
          },
        ],
      },
      {
        label: 'Go',
        contentSite: 'landing',
        url: '/docs/languages/go/',
        showSubNav: true,
        items: GoDriverData,
      },
      {
        label: 'Java',
        contentSite: 'landing',
        url: '/docs/languages/java/',
        collapsible: true,
        items: [
          {
            label: 'Java Sync Driver',
            contentSite: 'java',
            url: '/docs/drivers/java/sync/current/',
            showSubNav: true,
            items: JavaDriverData,
          },
          {
            label: 'Java Reactive Streams Driver',
            contentSite: 'java-rs',
            url: '/docs/languages/java/reactive-streams-driver/current/',
            showSubNav: true,
            items: JavarsDriverData,
          },
        ]
      },
      {
        label: 'Kotlin',
        contentSite: 'landing',
        url: '/docs/languages/kotlin/',
        collapsible: true,
        items: [
          {
            label: 'Kotlin Coroutine Driver',
            contentSite: 'kotlin',
            url: '/docs/drivers/kotlin/coroutine/current/',
            showSubNav: true,
            items: KotlinDriverData,
          },
          {
            label: 'Kotlin Sync Driver',
            contentSite: 'kotlin-sync',
            url: '/docs/languages/kotlin/kotlin-sync-driver/current/',
            showSubNav: true,
            items: KotlinSyncDriverData,
          },
        ],
      },
      {
        label: 'PHP',
        contentSite: 'landing',
        url: '/docs/languages/php/',
        collapsible: true,
        items: [
          {
            label: 'PHP Extension',
            isExternal: true,
            url: 'https://www.php.net/mongodb',
          },
          {
            label: 'PHP Library',
            contentSite: 'php-library',
            url: '/docs/php-library/current/',
            showSubNav: true,
            items: PHPLibraryData,
          },
          {
            label: 'Laravel MongoDB',
            contentSite: 'laravel',
            url: '/docs/drivers/php/laravel-mongodb/current/',
            showSubNav: true,
            items: LaravelDriverData,
          },
          {
            label: 'Symfony Integration',
            contentSite: 'drivers',
            url: '/docs/drivers/php-frameworks/symfony/',
          },
          {
            label: 'Drupal Integration',
            contentSite: 'drivers',
            url: '/docs/drivers/php-frameworks/drupal/',
          },
          {
            label: 'Libraries, Frameworks, & Tools',
            contentSite: 'drivers',
            url: '/docs/drivers/php-libraries/',
          },
        ],
      },
      {
        label: 'Node.js',
        contentSite: 'landing',
        url: '/docs/languages/javascript',
        showSubNav: true,
        items: NodeDriverData,
      },
      {
        label: 'Python',
        contentSite: 'landing',
        url: '/docs/languages/python/',
        collapsible: true,
        items: [
          {
            label: 'PyMongo',
            contentSite: 'pymongo',
            url: '/docs/languages/python/pymongo-driver/current/',
            showSubNav: true,
            items: PymongoDriverData,
          },
          {
            label: 'PyMongoArrow',
            contentSite: 'pymongo-arrow',
            url: '/docs/languages/python/pymongo-arrow-driver/current/',
            showSubNav: true,
            items: PymongoArrowDriverData,
          },
          {
            label: 'Django MongoDB Backend',
            contentSite: 'django',
            url: '/docs/languages/python/django-mongodb/current/',
            showSubNav: true,
            items: DjangoDriverData,
          },
          {
            label: 'Motor (Async Driver)',
            contentSite: 'drivers',
            url: '/docs/drivers/motor/',
          },
        ],
      },
      {
        label: 'Ruby',
        contentSite: 'landing',
        url: '/docs/languages/ruby/',
        collapsible: true,
        items: [
          {
            label: 'Ruby Driver',
            contentSite: 'ruby-driver',
            url: '/docs/ruby-driver/current/',
            showSubNav: true,
            items: RubyDriverData,
          },
          {
            label: 'Ruby Mongoid ODM',
            contentSite: 'mongoid',
            url: '/docs/mongoid/current/',
            showSubNav: true,
            items: MongoidDriverData,
          },
        ],
      },
      {
        label: 'Rust',
        contentSite: 'landing',
        url: '/docs/languages/rust/',
        showSubNav: true,
        items: RustDriverData,
      },
      {
        label: 'Scala',
        contentSite: 'landing',
        url: '/docs/languages/scala/',
        showSubNav: true,
        items: ScalaDriverData,
      },
    ],
  },
  {
    label: 'Compatibility',
    contentSite: 'drivers',
    group: true,
    items: [
      {
        label: 'Driver Compatibility Tables',
        contentSite: 'drivers',
        url: '/docs/drivers/compatibility',
      },
      {
        label: 'Other Document Database Compatibility',
        contentSite: 'drivers',
        url: '/docs/drivers/other-document-dbs',
        collapsible: true,
        items: [
          {
            label: 'Amazon DocumentDB Compatibility',
            contentSite: 'drivers',
            url: '/docs/drivers/documentdb-support',
          },
          {
            label: 'Azure Cosmos DB Compatibility',
            contentSite: 'drivers',
            url: '/docs/drivers/cosmosdb-support',
          },
          {
            label: 'ORMs, ODMs, and Libraries',
            contentSite: 'drivers',
            url: '/docs/drivers/odm',
          },
        ],
      },
    ],
  },
];

export default tocData;
