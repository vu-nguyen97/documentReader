import {
  clip,
  clipEvenOdd,
  closePath,
  cmyk,
  degrees,
  drawRectangle,
  endPath,
  grayscale,
  LineCapStyle,
  LineJoinStyle,
  lineTo,
  typedArrayFor,
  moveTo,
  PDFDocument,
  popGraphicsState,
  pushGraphicsState,
  rgb,
  setLineJoin,
  StandardFonts,
  AFRelationship,
} from 'pdf-lib';

const size = 750;
const ipsumLines = [
  'Eligendi est pariatur quidem in non excepturi et.',
  'Consectetur non tenetur magnam est corporis tempor.',
  'Labore nisi officiis quia ipsum qui voluptatem omnis.',
];

export const getPage = (pdfDoc, timesRomanFont) => {
  const page1 = pdfDoc.addPage([size, size]);

  // Upper-left Quadrant
  page1.moveTo(0, size / 2);
  page1.drawSquare({size: size / 2, color: rgb(1, 0, 0)});
  page1.pushOperators(
    pushGraphicsState(),
    moveTo(0, size / 2),
    lineTo(0, size),
    lineTo(size / 2, size),
    closePath(),
    clip(),
    endPath(),
    ...drawRectangle({
      x: size / 8,
      y: size / 2 + size / 8,
      width: size / 4,
      height: size / 4,
      borderWidth: 50,
      borderColor: rgb(1, 1, 0),
      rotate: degrees(0),
      xSkew: degrees(0),
      ySkew: degrees(0),
      color: undefined,
    }),
    popGraphicsState(),
  );

  // Upper-right quadrant
  page1.pushOperators(pushGraphicsState());
  page1.moveTo(size / 2, size / 2);
  page1.drawSquare({size: size / 2, color: rgb(0, 1, 0)});
  page1.drawEllipse({
    x: size / 2 + size / 4,
    y: size / 2 + size / 4,
    xScale: 25,
    yScale: 150,
    color: rgb(255 / 255, 153 / 255, 51 / 255),
    borderWidth: 2,
    borderColor: rgb(0, 1, 1),
    borderDashArray: [10],
  });
  page1.drawEllipse({
    x: size / 2 + size / 4,
    y: size / 2 + size / 4,
    xScale: 75,
    yScale: 50,
    color: undefined,
  });
  page1.drawEllipse({
    x: size / 2 + size / 4,
    y: size / 2 + size / 4,
    xScale: 150,
    yScale: 100,
    color: undefined,
  });
  page1.pushOperators(clipEvenOdd(), endPath());
  page1.setFont(timesRomanFont);
  page1.setFontColor(rgb(1, 0, 1));
  page1.setFontSize(32);
  page1.setLineHeight(32);
  page1.moveTo(size / 2 + 5, size - 5 - 25);
  page1.drawText(
    [...ipsumLines, ...ipsumLines, ...ipsumLines, ...ipsumLines].join('\n'),
  );
  page1.pushOperators(popGraphicsState());

  // Lower-left quadrant
  page1.moveTo(0, 0);
  page1.drawSquare({size: size / 2, color: cmyk(1, 0, 0, 0)});
  page1.drawCircle({
    x: size / 4,
    y: size / 4,
    size: 150,
    borderWidth: 10,
    borderDashArray: [25],
    borderDashPhase: 25,
    borderColor: cmyk(0, 1, 0, 0),
    borderLineCap: LineCapStyle.Round,
  });

  page1.drawLine({
    start: {
      x: size / 4,
      y: size / 4,
    },
    end: {
      x: size / 4 + 100,
      y: size / 4 + 100,
    },
    color: rgb(0, 1, 0),
    thickness: 3,
    dashArray: [12, 6],
    lineCap: LineCapStyle.Round,
  });

  // Lower-right quadrant
  page1.moveTo(size / 2, 0);
  page1.drawSquare({size: size / 2, color: grayscale(0.8)});
  page1.pushOperators(pushGraphicsState(), setLineJoin(LineJoinStyle.Round));
  page1.drawSquare({
    x: size / 2 + size / 4,
    y: 25,
    size: size / 2.25 - 2 * 50,
    rotate: degrees(45),
    borderColor: grayscale(0.6),
    borderWidth: 15,
  });
  page1.pushOperators(setLineJoin(LineJoinStyle.Bevel));
  page1.drawSquare({
    x: size / 2 + 54,
    y: size / 4 + 1,
    size: size / 2.25 - 2 * 100,
    rotate: degrees(-45),
    xSkew: degrees(45 / 2),
    ySkew: degrees(45 / 2),
    color: grayscale(1),
    borderColor: grayscale(0),
    borderWidth: 15,
  });
  page1.pushOperators(popGraphicsState());

  // Middle
  const squareSize = 40;
  page1.drawSquare({
    x: size / 2 - squareSize / 2,
    y: size / 2 - squareSize / 2,
    size: squareSize,
    borderWidth: 2,
    borderColor: rgb(1, 0, 1),
    borderDashArray: [2, 4],
  });

  const rectangleSizeX = 60;
  const rectangleSizeY = 50;
  page1.drawRectangle({
    x: size / 2 - rectangleSizeX / 2,
    y: size / 2 - rectangleSizeY / 2,
    width: rectangleSizeX,
    height: rectangleSizeY,
    borderWidth: 2,
    borderColor: rgb(1, 1, 1),
    borderDashArray: [4, 8],
  });

  return page1;
};
