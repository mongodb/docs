'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@via-ds/components/button';
import { Size } from '@via-ds/components/types';
import {
  Cell,
  HeaderCell,
  HeaderRow,
  Row,
  Table,
  TableBody,
  TableHead,
  TanStack,
  useTable,
  VerticalAlignment,
  type ViaColumnDef,
  type ViaTableRow,
} from '@via-ds/components/table';
import { Content, Footer, Header } from '@via-ds/components/structure';
import { Dialog, DialogRoot } from '@via-ds/components/dialog';
import { Link, Text, TextStyle } from '@via-ds/components/typography';
import { toast } from '@via-ds/components/toast';
import fetchAndSaveFile from '@/utils/download-file';
import { VersionSelect } from './version-selector';
import { useOfflineDownloadContext, type OfflineVersion, type OfflineObject } from './download-context';
import styles from './download-modal.module.scss';

type ModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const DownloadModal = ({ open, setOpen }: ModalProps) => {
  const [searchText, setSearchText] = useState('');
  const [resultsLoading, setResultsLoading] = useState(false);
  const [rowSelection, setRowSelection] = useState<{ [key: string]: boolean }>({});
  const contentRef = useRef<HTMLDivElement>(null);
  const { offlineObjects } = useOfflineDownloadContext(); // repos need to be l1 and l3 headers or something

  const selectedVersions = useRef<Record<OfflineObject['displayName'], OfflineVersion>>({});

  useEffect(() => {
    // reset row selection when modal is opened/closed
    setRowSelection({});
  }, [open]);

  const columns = useMemo(() => {
    return [
      {
        header: 'Products',
        accessorKey: 'displayName',
        enableGlobalFilter: true,
        cell: (cellContext) => {
          const displayName = (cellContext.getValue() ?? '') as OfflineObject['displayName'];
          const repo = cellContext.row.original;

          return (
            <>
              <Text className={repo?.l1 ? styles.productNameL1 : undefined}>
                {repo?.l1 ? displayName.toUpperCase() : displayName}
              </Text>
              {repo.subTitle && <Text textStyle={TextStyle.disclaimer}>{repo.subTitle}</Text>}
            </>
          );
        },
      },
      {
        header: 'Version',
        accessorKey: 'versions',
        cell: (cellContext) => {
          const versions = (cellContext.getValue() ?? []) as OfflineVersion[];
          const { displayName: repoDisplayName, versionIndex } = cellContext.row.original;
          if (versions?.length < 2) {
            selectedVersions.current[repoDisplayName] = versions[versionIndex];
            return;
          }
          return (
            <VersionSelect
              offlineRepo={cellContext.row.original}
              versions={versions}
              versionIndex={versionIndex}
              contentRef={contentRef}
              onSelect={(index: number) => {
                const version = versions[index];
                if (version) {
                  selectedVersions.current[repoDisplayName] = version;
                }
              }}
            />
          );
        },
        enableGlobalFilter: true,
      },
    ] as Array<ViaColumnDef<OfflineObject>>;
  }, []);

  const filter = useCallback((row: ViaTableRow<OfflineObject>, _columnId: string, filterValue: string) => {
    const searchText = filterValue.toLowerCase();
    const offlineRepo = row.original;
    return (
      offlineRepo.displayName.toLowerCase().includes(searchText) ||
      offlineRepo.versions
        .reduce((res: string, version: OfflineVersion) => {
          return res + ' ' + version.displayName;
        }, '')
        ?.includes(searchText)
    );
  }, []);

  const table = useTable({
    data: offlineObjects,
    columns: columns,
    hasSelectableRows: true,
    state: {
      rowSelection,
      globalFilter: searchText,
    },
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: TanStack.getFilteredRowModel(),
    globalFilterFn: filter,
    onGlobalFilterChange: setSearchText,
  });
  const { rows } = table.getRowModel();

  const onDownload = async () => {
    if (!rowSelection || !Object.keys(rowSelection)?.length) {
      return;
    }
    setResultsLoading(true);
    const selectedDisplayNames = table.getSelectedRowModel().flatRows.map((row) => row.original.displayName);
    const urlsToRequest: { repo: string; version: string; url: string }[] = [];
    for (const displayName of selectedDisplayNames) {
      urlsToRequest.push({
        repo: displayName,
        version: selectedVersions.current[displayName].displayName,
        url: selectedVersions.current[displayName].url,
      });
    }
    try {
      await Promise.all(
        urlsToRequest.map(async (urlData) => {
          try {
            await fetchAndSaveFile(urlData.url, `${urlData.repo}-${urlData.version}.tar.gz`);
            toast.success('Download Initiated', { description: urlData.repo, isDismissible: true });
          } catch (e) {
            toast.warning('Download Failed', { description: urlData.repo, isDismissible: true });
            throw e;
          }
        }),
      );
      setOpen(false);
    } catch (e) {
      console.error(`Error downloading, `, e);
    } finally {
      setResultsLoading(false);
    }
  };

  return (
    <DialogRoot isOpen={open} onOpenChange={setOpen}>
      <Dialog className={styles.dialog} size={Size.Large}>
        <Header>
          <Text slot="title">Download Documentation</Text>
          <Text slot="description">
            Navigate the table to find the product and version you wish to download. Looking for another product? Visit
            our&nbsp;
            <Link linkStyle="external" isStandalone={false} href={'https://mongodb.com/docs/legacy/'} target="_blank">
              legacy docs site
            </Link>
          </Text>
        </Header>

        <Content isScrollable ref={contentRef} className={styles.content}>
          <Table
            table={table}
            shouldAlternateRowColor={true}
            verticalAlignment={VerticalAlignment.Middle}
            className={styles.table}
          >
            <TableHead isSticky>
              {table.getHeaderGroups().map((headerGroup: TanStack.HeaderGroup<OfflineObject>) => (
                <HeaderRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <HeaderCell key={header.id} header={header}>
                        {TanStack.flexRender(header.column.columnDef.header, header.getContext())}
                      </HeaderCell>
                    );
                  })}
                </HeaderRow>
              ))}
            </TableHead>

            <TableBody>
              {rows.map((row: ViaTableRow<OfflineObject>) => {
                return (
                  <Row key={row.id} row={row}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <Cell key={cell.id} cell={cell}>
                          {TanStack.flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Cell>
                      );
                    })}
                  </Row>
                );
              })}
            </TableBody>
          </Table>
        </Content>

        <Footer>
          <Button onPress={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="primary"
            isPending={resultsLoading}
            isDisabled={!rowSelection || !Object.keys(rowSelection)?.length}
            onPress={onDownload}
          >
            Download
          </Button>
        </Footer>
      </Dialog>
    </DialogRoot>
  );
};
