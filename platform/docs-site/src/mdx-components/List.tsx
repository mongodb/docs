import styles from './list.module.scss';

const enumtypeMap = {
  arabic: '1',
  loweralpha: 'a',
  upperalpha: 'A',
  lowerroman: 'i',
  upperroman: 'I',
} as const;

export type ListEnumtype = 'unordered' | 'arabic' | 'loweralpha' | 'upperalpha' | 'lowerroman' | 'upperroman';

export type ListProps = {
  children: React.ReactNode;
  enumtype?: ListEnumtype;
  startat?: number;
};

export const List = ({ children, enumtype, startat }: ListProps) => {
  const ListTag = enumtype === 'unordered' ? 'ul' : 'ol';

  const typeAttr = enumtype && enumtype in enumtypeMap ? enumtypeMap[enumtype as keyof typeof enumtypeMap] : undefined;
  const startAttr = startat ?? undefined;

  return (
    <ListTag
      className={styles.list}
      {...(typeAttr ? { type: typeAttr } : {})}
      {...(startAttr ? { start: startAttr } : {})}
    >
      {children}
    </ListTag>
  );
};
