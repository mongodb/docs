import { isObject, isString } from 'lodash';
import type {
  Directive,
  ParentNode,
  TextNode,
  RoleName,
  HeadingNode,
  FootnoteReferenceNode,
  WayfindingOptionNode,
  WayfindingDescriptionNode,
  ReferenceNode,
  RefRoleNode,
} from './ast';
import { roleNames } from './ast';

const isTextNode = (node: unknown): node is TextNode => {
  return isObject(node) && 'type' in node && node.type === 'text' && 'value' in node && isString(node.value);
};

const isReferenceNode = (node: unknown): node is ReferenceNode => {
  return isObject(node) && 'type' in node && node.type === 'reference';
};

const isRefRoleNode = (node: unknown): node is RefRoleNode => {
  return isObject(node) && 'type' in node && node.type === 'ref_role';
};

const isParentNode = (node: unknown): node is ParentNode => {
  return isObject(node) && 'children' in node && Array.isArray(node.children);
};

const isDirectiveNode = (node: unknown): node is Directive => {
  return (
    isParentNode(node) && 'name' in node && isString(node.name) && 'argument' in node && Array.isArray(node.argument)
  );
};

const isRoleName = (name: string): name is RoleName => {
  return roleNames.includes(name);
};

const isHeadingNode = (node: unknown): node is HeadingNode => {
  return isParentNode(node) && node.type === 'heading';
};

const isFootnoteReferenceNode = (node: unknown): node is FootnoteReferenceNode => {
  return isParentNode(node) && node.type === 'footnote_reference';
};

const isWayfindingOptionNode = (node: unknown): node is WayfindingOptionNode => {
  return isDirectiveNode(node) && node.name === 'wayfinding-option';
};

const isWayfindingDescriptionNode = (node: unknown): node is WayfindingDescriptionNode => {
  return isDirectiveNode(node) && node.name === 'wayfinding-description';
};

export {
  isTextNode,
  isParentNode,
  isDirectiveNode,
  isFootnoteReferenceNode,
  isReferenceNode,
  isRefRoleNode,
  isRoleName,
  isHeadingNode,
  isWayfindingOptionNode,
  isWayfindingDescriptionNode,
};
