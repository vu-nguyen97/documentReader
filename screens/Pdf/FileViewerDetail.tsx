import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, View, Text, ScrollView} from 'react-native';
import {Appbar} from 'react-native-paper';
import Pdf from 'react-native-pdf';
import XLSX from 'xlsx';
import {DataTable} from 'react-native-paper';
import RNFS from 'react-native-fs';
import mammoth from 'mammoth';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
import {Platform} from 'react-native';

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
    let rowData: any = {};

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

function base64ToArrayBuffer(data: any) {
  const binaryString = atob(data); // Giải mã data thành chuỗi binary
  const length = binaryString.length;
  const bytes = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes.buffer; // Chuyển đổi thành ArrayBuffer
}

export default function FileViewerDetail({file, setFileInParent}: any) {
  const [tableData, setTableData] = useState<any[]>([]);
  const [tableHeaders, setTableHeaders] = useState<String[]>([]);
  const [columnWidths, setColumnWidths] = useState({});
  const [docxConvertFilePath, setDocxConvertFilePath] = useState<any>();
  const [textFileContent, setTextFileContent] = useState<String>();

  const viewExcelFile = async () => {
    const data = await RNFS.readFile(file.fileCopyUri, 'base64');
    let workBook = XLSX.read(data, {type: 'base64'});
    let firstSheet = workBook.SheetNames[0];
    let workSheet = workBook.Sheets[firstSheet];
    if (workSheet) {
      const headers = getHeaderRow(workSheet);
      setTableHeaders(headers);
      const excelData = readExcelData(workSheet, headers);
      setTableData(excelData);
    }
  };

  const convertDocxToPdf = async (path: any) => {
    try {
      // Read the DOCX file
      const data = await RNFS.readFile(path, 'base64');
      const arrayData = base64ToArrayBuffer(data);

      // Convert DOCX to HTML
      const htmlFile = await mammoth.convertToHtml({arrayBuffer: arrayData});
      const html = htmlFile.value;

      // Save the HTML content to a file
      const HtmlPath = RNFS.CachesDirectoryPath + '/Test.html';
      await RNFS.writeFile(HtmlPath, html, 'utf8');
      console.log('HTML file created at: file://' + HtmlPath);

      // Convert the HTML to PDF
      const pdfOptions = {
        html,
        fileName: 'Test',
        directory: RNFS.CachesDirectoryPath,
      };
      const pdfFilePath = await RNHTMLtoPDF.convert(pdfOptions);
      console.log('PDF file created at:', pdfFilePath.filePath);
      return pdfFilePath.filePath;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const readTxtFile = async () => {
    try {
      const content = await RNFS.readFile(file.fileCopyUri, 'utf8');
      setTextFileContent(content);
    } catch (err) {
      console.log('error :>> ', err);
    }
  };

  const handleBack = () => {
    setFileInParent(undefined);
  };
  const openMoreAction = () => {};

  if (file.type == 'application/pdf') {
    return (
      <View style={{flex: 1}}>
        <Appbar.Header>
          <Appbar.BackAction onPress={handleBack} />
          <Appbar.Content title="Title" />
          <Appbar.Action icon="magnify" onPress={() => {}} />
          <Appbar.Action icon={MORE_ICON} onPress={openMoreAction} />
        </Appbar.Header>
        <Pdf
          source={{uri: file.fileCopyUri, cache: false}}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            // console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log('load file err', error);
          }}
          style={styles.pdf}
        />
      </View>
    );
  } else if (
    file.type ==
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) {
    useEffect(() => {
      viewExcelFile();
    }, []);

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

    return (
      <ScrollView>
        <Appbar.Header>
          <Appbar.BackAction onPress={handleBack} />
          <Appbar.Content title="Title" />
          <Appbar.Action icon="magnify" onPress={() => {}} />
          <Appbar.Action icon={MORE_ICON} onPress={openMoreAction} />
        </Appbar.Header>
        {tableData.length > 0 && (
          <ScrollView horizontal={true}>
            <View style={{flexDirection: 'row'}}>
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
  } else if (
    file.type ==
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    const handleConvertDocxToPdf = async () => {
      const pdfFilePath = await convertDocxToPdf(file.fileCopyUri);
      const path = 'File://' + pdfFilePath;
      setDocxConvertFilePath(path);
    };

    handleConvertDocxToPdf();
    return (
      <View style={{flex: 1}}>
        <Appbar.Header>
          <Appbar.BackAction onPress={handleBack} />
          <Appbar.Content title="Title" />
          <Appbar.Action icon="magnify" onPress={() => {}} />
          <Appbar.Action icon={MORE_ICON} onPress={openMoreAction} />
        </Appbar.Header>
        <Pdf
          source={{uri: docxConvertFilePath, cache: false}}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            // console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log('load file err', error);
          }}
          style={styles.pdf}
        />
      </View>
    );
  } else if (file.type == 'text/plain') {
    useEffect(() => {
      readTxtFile();
    }, []);

    return (
      <ScrollView>
        <Appbar.Header>
          <Appbar.BackAction onPress={handleBack} />
          <Appbar.Content title="Title" />
          <Appbar.Action icon="magnify" onPress={() => {}} />
          <Appbar.Action icon={MORE_ICON} onPress={openMoreAction} />
        </Appbar.Header>
        <Text style={{paddingHorizontal: 10}}>{textFileContent}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width - 20,
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
