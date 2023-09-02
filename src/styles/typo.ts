import font from './font';

export interface ITypo {
  title: {
    h1_b: string;
    h1: string;
    h2_b: string;
    h2: string;
    h3_b: string;
    h3: string;
    h4_b: string;
    h4: string;
    h5_b: string;
    h5: string;
    h6_b: string;
    h6: string;
  };
  body: {
    b1_b: string;
    b1: string;
    b2_b: string;
    b2: string;
  };
  caption: {
    c_b: string;
    c: string;
  };
}

const typo: ITypo = {
  title: {
    h1_b: `
      font-weight: ${font.weight.bold};
      font-size: ${font.size.h1};
      font-family: 'NanumSquareRoundOTFB';
    `,
    h1: `
      font-weight: ${font.weight.regular};
      font-size: ${font.size.h1};
      font-family: 'NanumSquareRoundOTFR';
    `,
    h2_b: `
      font-weight: ${font.weight.bold};
      font-size: ${font.size.h2};
      font-family: 'NanumSquareRoundOTFB';
      `,
    h2: `
      font-weight: ${font.weight.regular};
      font-size: ${font.size.h2};
      font-family: 'NanumSquareRoundOTFR';
      `,
    h3_b: `
      font-weight: ${font.weight.bold};
      font-size: ${font.size.h3};
      font-family: 'NanumSquareRoundOTFB';
      `,
    h3: `
      font-weight: ${font.weight.regular};
      font-size: ${font.size.h3};
      font-family: 'NanumSquareRoundOTFR';
      `,
    h4_b: `
      font-weight: ${font.weight.bold};
      font-size: ${font.size.h4};
      font-family: 'NanumSquareRoundOTFB';
      `,
    h4: `
      font-weight: ${font.weight.regular};
      font-size: ${font.size.h4};
      font-family: 'NanumSquareRoundOTFR';
      `,
    h5_b: `
      font-weight: ${font.weight.bold};
      font-size: ${font.size.h5};
      font-family: 'NanumSquareRoundOTFB';
      `,
    h5: `
      font-weight: ${font.weight.regular};
      font-size: ${font.size.h5};
      font-family: 'NanumSquareRoundOTFR';
      `,
    h6_b: `
      font-weight: ${font.weight.bold};
      font-size: ${font.size.h6};
      font-family: 'NanumSquareRoundOTFB';
      `,
    h6: `
      font-weight: ${font.weight.regular};
      font-size: ${font.size.h6};
      font-family: 'NanumSquareRoundOTFR';
      `,
  },
  body: {
    b1_b: `
      font-weight: ${font.weight.bold};
      font-size: ${font.size.b1};
      font-family: 'NanumSquareRoundOTFB';
      `,
    b1: `
      font-weight: ${font.weight.regular};
      font-size: ${font.size.b1};
      font-family: 'NanumSquareRoundOTFR';
      `,
    b2_b: `
      font-weight: ${font.weight.bold};
      font-size: ${font.size.b2};
      font-family: 'NanumSquareRoundOTFB';
      `,
    b2: `
      font-weight: ${font.weight.regular};
      font-size: ${font.size.b2};
      font-family: 'NanumSquareRoundOTFR';
      `,
  },
  caption: {
    c_b: `
      font-weight: ${font.weight.bold};
      font-size: ${font.size.c};
      font-family: 'NanumSquareRoundOTFB';
      `,
    c: `
      font-weight: ${font.weight.regular};
      font-size: ${font.size.c};
      font-family: 'NanumSquareRoundOTFR';
      `,
  },
};

export default typo;
