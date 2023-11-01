import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import XLSX from 'xlsx';
import {DataTable} from 'react-native-paper';
import RNFS from 'react-native-fs';
import {MORE_ICON} from '../../../components/common/Helpers/UIHelpers';
import Loading from '../../../components/common/Loading/Loading';
import {LOAD_FILE} from '../../../components/constants/constants';
import {SafeAreaView} from 'react-native-safe-area-context';

function getHeaderRow(workSheet: any) {
  const headers = [];
  const range = XLSX.utils.decode_range(workSheet['!ref'] ?? '');
  const row = 0;
  for (let col = 0; col <= range.e.c; ++col) {
    const cell = workSheet[XLSX.utils.encode_cell({c: col, r: row})];
    const header = cell && cell.t ? XLSX.utils.format_cell(cell) : 'unknown';
    if (header != 'unknown') headers[col] = header;
    else headers[col] = null;
  }
  return headers;
}

function readExcelData(workSheet: any, headers: any) {
  const data = [];
  const range = XLSX.utils.decode_range(workSheet['!ref'] ?? '');
  let maxRow = 0;

  for (let row = 0; row <= range.e.r; row++) {
    for (let col = 0; col <= range.e.c; col++) {
      const cell = workSheet[XLSX.utils.encode_cell({c: col, r: row})];
      if (cell && cell.t) {
        maxRow = Math.max(maxRow, row);
      }
    }
  }

  for (let row = 0; row <= maxRow; row++) {
    const rowData = {};

    for (let col = 0; col <= range.e.c; col++) {
      const cell = workSheet[XLSX.utils.encode_cell({c: col, r: row})];

      if (cell && cell.v !== null && cell.v !== undefined) {
        rowData[col] = XLSX.utils.format_cell(cell);
      } else {
        rowData[col] = null;
      }
    }

    data.push(rowData);
  }
  data.shift();
  return data;
}

export default function ExcelViewer(props: any) {
  const {handleBack, file} = props;

  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [tableHeaders, setTableHeaders] = useState<String[]>([]);
  const [columnWidths, setColumnWidths] = useState({});
  const [sheetNumber, setSheetNumber] = useState<any>(0);
  const [sheetNames, setSheetNames] = useState<any>([]);

  useEffect(() => {
    if (!file) return;
    viewExcelFile();
  }, [file, sheetNumber]);

  const viewExcelFile = async () => {
    setIsLoading(true);
    const data = await RNFS.readFile(file.fileCopyUri, 'base64');
    const workBook = XLSX.read(data, {type: 'base64'});
    setSheetNames(workBook.SheetNames);
    const firstSheet = workBook.SheetNames[sheetNumber];
    const workSheet = workBook.Sheets[firstSheet];

    setIsLoading(false);
    if (workSheet) {
      const headers = getHeaderRow(workSheet);
      setTableHeaders(headers);
      const excelData = readExcelData(workSheet, headers);
      setTableData(excelData);
    }
  };

  useEffect(() => {
    const widths = {};
    tableHeaders.forEach((header, index) => {
      const maxWidth = Math.max(
        ...tableData.map(rowData => String(rowData[index]).length),
        String(header).length,
      );
      widths[index] = maxWidth * 15;
    });
    setColumnWidths(widths);
  }, [tableData]);

  const openMoreAction = () => {};

  if (isLoading) return <Loading text={LOAD_FILE} />;

  return (
    <SafeAreaView>
      <ScrollView>
        <Appbar.Header style={styles.headerMenu}>
          <Appbar.BackAction onPress={handleBack} />
          <Appbar.Content title="Title" />
          <Appbar.Action icon="magnify" onPress={() => {}} />
          <Appbar.Action icon={MORE_ICON} onPress={openMoreAction} />
        </Appbar.Header>
        {(tableData.length > 0 || Headers.length > 0) && (
          <ScrollView horizontal={true} style={{marginBottom: 40}}>
            <View style={styles.table}>
              <DataTable>
                <DataTable.Header>
                  {tableHeaders.map((header, index) => (
                    <DataTable.Title
                      key={index}
                      style={[
                        styles.tableHeaders,
                        {
                          borderLeftWidth: index === 0 ? 1 : 0,
                          width: columnWidths[index],
                        },
                      ]}>
                      {header}
                    </DataTable.Title>
                  ))}
                </DataTable.Header>

                {tableData.map((rowData, rowIndex) => (
                  <DataTable.Row key={rowIndex}>
                    {tableHeaders.map((header, headerIndex) => (
                      <DataTable.Cell
                        key={headerIndex}
                        style={[
                          styles.dataCell,
                          {
                            borderLeftWidth: headerIndex === 0 ? 1 : 0,
                            flex: 1,
                            width: columnWidths[headerIndex],
                          },
                        ]}>
                        <Text style={styles.cellText}>
                          {rowData[headerIndex]}
                        </Text>
                      </DataTable.Cell>
                    ))}
                  </DataTable.Row>
                ))}
              </DataTable>
            </View>
          </ScrollView>
        )}
      </ScrollView>

      <ScrollView
        horizontal={true}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#FFFFFF',
        }}>
        <View
          style={{
            paddingLeft: 15,
            paddingBottom: 10,
            paddingTop: 5,
            paddingRight: 15,
          }}>
          {sheetNames.length > 1 && (
            <View style={styles.sheetButtonRow}>
              {sheetNames.map((sheetName: any, index: any) =>
                index == Number(sheetNumber) ? (
                  <TouchableOpacity
                    style={[
                      styles.sheetButton,
                      {borderColor: 'blue', backgroundColor: 'lightblue'},
                    ]}
                    key={index}
                    onPress={() => (setSheetNumber(index), viewExcelFile)}>
                    <Text style={{fontWeight: 'bold'}}>{sheetName}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.sheetButton}
                    key={index}
                    onPress={() => (setSheetNumber(index), viewExcelFile)}>
                    <Text style={{fontWeight: 'bold'}}>{sheetName}</Text>
                  </TouchableOpacity>
                ),
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerMenu: {
    width: Dimensions.get('window').width,
  },
  table: {
    marginVertical: 16,
    flexDirection: 'row',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tableHeaders: {
    backgroundColor: 'lightblue',
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    borderRightWidth: 1,
    borderColor: 'gray',
    width: 100,
  },
  dataCell: {
    padding: 8,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: 'gray',
    width: 100,
  },
  cellText: {
    flexWrap: 'wrap', // Enable text wrapping in cells
  },
  sheetButtonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignContent: 'space-around',
  },
  sheetButton: {
    marginRight: 10,
    padding: 4,
    marginBottom: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
