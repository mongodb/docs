'use client';

import IconC from './C';
import IconCompass from './Compass';
import IconCpp from './Cpp';
import IconCsharp from './Csharp';
import IconGo from './Go';
import IconJava from './Java';
import IconKotlin from './Kotlin';
import IconNode from './Node';
import IconPHP from './Php';
import IconPython from './Python';
import IconRuby from './Ruby';
import IconRust from './Rust';
import IconScala from './Scala';
import IconShell from './Shell';
import IconSwift from './Swift';
import IconObjectiveC from './ObjectiveC';
import IconJavascript from './Javascript';
import IconTypescript from './Typescript';
import IconDart from './Dart';

export type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;
export type DriverMap = Record<string, IconComponent>;

export const DRIVER_ICON_MAP: DriverMap = {
  c: IconC,
  compass: IconCompass,
  cpp: IconCpp,
  'cpp-sdk': IconCpp,
  csharp: IconCsharp,
  dart: IconDart,
  go: IconGo,
  java: IconJava,
  'java-sync': IconJava,
  'java-async': IconJava,
  javascript: IconJavascript,
  kotlin: IconKotlin,
  'java-kotlin': IconKotlin,
  'kotlin-coroutine': IconKotlin,
  'kotlin-sync': IconKotlin,
  nodejs: IconNode,
  objectivec: IconObjectiveC,
  php: IconPHP,
  python: IconPython,
  ruby: IconRuby,
  rust: IconRust,
  'rust-sync': IconRust,
  'rust-async': IconRust,
  scala: IconScala,
  shell: IconShell,
  swift: IconSwift,
  'swift-async': IconSwift,
  'swift-sync': IconSwift,
  typescript: IconTypescript,
};
