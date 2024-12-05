import React from 'react';
import Tooltip from './Tooltip'; // Import the Tooltip component
import { Term } from '@interfaces/Article';


interface HighlightedContentProps {
  description: string;
  terms: Term[];
}

const HighlightedContent = ({ description, terms }: HighlightedContentProps) => {
  // Function to split and replace terms in the description
  const renderDescriptionWithTooltips = () => {
    let parts: (string | JSX.Element)[] = [description];

    terms.forEach(({ term, definition }) => {
      parts = parts.flatMap((part) => {
        if (typeof part !== 'string') return part;

        const regex = new RegExp(`(${term})`, 'gi'); // Case-insensitive match
        return part.split(regex).map((segment, i) =>
          regex.test(segment) ? (
            <Tooltip key={i} term={segment} definition={definition} />
          ) : (
            segment
          )
        );
      });
    });

    return parts;
  };

  return <p>{renderDescriptionWithTooltips()}</p>; // Wrap the content in a <p> tag or appropriate container
};

export default HighlightedContent;