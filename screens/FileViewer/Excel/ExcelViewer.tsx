import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View, Text, ScrollView} from 'react-native';
import {Appbar} from 'react-native-paper';
import XLSX from 'xlsx';
import {DataTable} from 'react-native-paper';
import RNFS from 'react-native-fs';
import {MORE_ICON} from '../../../components/common/Helpers/UIHelpers';
import Loading from '../../../components/common/Loading/Loading';
import {LOAD_FILE} from '../../../components/constants/constants';

function getHeaderRow(workSheet: any) {
  const headers = [];
  const range = XLSX.utils.decode_range(workSheet['!ref'] ?? '');
  const row = range.s.r;
  for (let col = range.s.c; col <= range.e.c; ++col) {
    const cell =
      workSheet[
        XLSX.utils.encode_cell({c: col, r: row})
      ]; /* find the cell in the first row */
    const header = cell && cell.t ? XLSX.utils.format_cell(cell) : 'unknown';
    if (header != 'unknown') headers.push(header);
  }
  return headers;
}

function readExcelData(workSheet: any, headers: any) {
  const data = []; // Mảng lưu trữ dữ liệu từ từng dòng
  let length = 0;

  const range = XLSX.utils.decode_range(workSheet['!ref'] ?? '');
  for (let row = range.s.r; row <= range.e.r; row++) {
    const cell = workSheet['A' + row];
    if (cell && cell.v !== null && cell.v !== undefined) {
      length++;
    }
  }

  for (let row = range.s.r + 1; row <= length - 1; ++row) {
    let rowData = {};

    for (let col = range.s.c; col < headers.length; ++col) {
      const cell = workSheet[XLSX.utils.encode_cell({c: col, r: row})];

      // Lấy tên cột từ mảng tiêu đề (đã được trích xuất ở trước)
      const columnName = headers[col];

      // Lấy giá trị từ ô và thêm vào đối tượng dữ liệu
      rowData[columnName] = cell ? XLSX.utils.format_cell(cell) : null;
    }

    // Thêm dữ liệu của dòng hiện tại vào mảng data
    data.push(rowData);
  }

  return data;
}

export default function ExcelViewer(props: any) {
  const {handleBack, file} = props;

  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [tableHeaders, setTableHeaders] = useState<String[]>([]);
  const [columnWidths, setColumnWidths] = useState({});

  useEffect(() => {
    if (!file) return;
    viewExcelFile();
  }, [file]);

  const viewExcelFile = async () => {
    setIsLoading(true);
    const data = await RNFS.readFile(file.fileCopyUri, 'base64');
    const workBook = XLSX.read(data, {type: 'base64'});
    const firstSheet = workBook.SheetNames[0];
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
    // Calculate the maximum width for each column
    const widths = {};
    tableHeaders.forEach(header => {
      const maxWidth = Math.max(
        ...tableData.map(rowData => String(rowData[header]).length),
        String(header).length,
      );
      widths[header] = maxWidth * 8; // Adjust the multiplier to fit your content
    });
    setColumnWidths(widths);
  }, [tableData]);

  const openMoreAction = () => {};

  if (isLoading) return <Loading text={LOAD_FILE} />;

  return (
    <ScrollView>
      <Appbar.Header style={styles.headerMenu}>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title="Title" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon={MORE_ICON} onPress={openMoreAction} />
      </Appbar.Header>
      {tableData.length > 0 && (
        <ScrollView horizontal={true}>
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
                        width: columnWidths[header],
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
                          width: columnWidths[header],
                        },
                      ]}>
                      <Text style={styles.cellText}>{rowData[header]}</Text>
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>
              ))}
            </DataTable>
          </View>
        </ScrollView>
      )}
    </ScrollView>
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
    fontSize: 16,
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
});
