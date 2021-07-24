import React, { FC } from 'react';
import './styles.scss';

export type Images = { src: string }[];

interface Props {
  images: Images;
  columns?: number;
}

export const ResponsiveImageGrid: FC<Props> = ({ images, columns = 4 }) => {
  const divideImagesToColumns = (images: Readonly<Images>) => {
    const imagesPerColumn = Math.floor(images.length / columns);
    let imgsCountLeftAfterEqualDivisionPerCol = images.length % columns;
    const columnsOfImages = [];

    let offset = 0;
    for (let i = 0; i < columns; i++) {
      const start = i * imagesPerColumn + offset;
      let end = i * imagesPerColumn + imagesPerColumn + offset;

      if (imgsCountLeftAfterEqualDivisionPerCol > 0) {
        imgsCountLeftAfterEqualDivisionPerCol--;
        offset++;
        end += 1;
      }

      columnsOfImages.push(images.slice(start, end));
    }
    return columnsOfImages;
  };

  return (
    <div className="row">
      {divideImagesToColumns(images).map((columnImages: Images, i) => (
        <div key={i} className="column">
          {columnImages.map(({ src }) => (
            <img alt={src} key={src} src={src} style={{ width: '100%' }} />
          ))}
        </div>
      ))}
    </div>
  );
};
