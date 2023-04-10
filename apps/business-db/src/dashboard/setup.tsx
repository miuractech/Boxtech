import { Button, Code, Title } from '@mantine/core';
import React, { useState } from 'react';

const CopyCodeButton = ({ link }: { link: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const codeToCopy = `
    <a href="${link}" target="_blank" rel="noopener noreferrer">
      <button style="background-color: #ff6a00; color: white; font-size: 16px; padding: 8px 16px; border-radius: 4px; box-shadow: 0px 0px 8px 2px rgba(255, 106, 0, 0.6); animation: glowing 2500ms infinite;">
        Click Me!
      </button>
    </a>
    <style>
      @keyframes glowing {
        0% {
          box-shadow: 0 0 5px #ff6a00;
        }
        40% {
          box-shadow: 0 0 20px #ff6a00;
        }
        60% {
          box-shadow: 0 0 20px #ff6a00;
        }
        100% {
          box-shadow: 0 0 5px #ff6a00;
        }
      }
    </style>
  `;
  const handleClick = () => {
    setIsCopied(true);

    navigator.clipboard.writeText(codeToCopy);
  };

  return (
    <div>
        <Title order={3}>
            Copy this code and paste to your website
        </Title>
      <Code block className='w-full' >{codeToCopy}</Code>
      <Button color={isCopied ? 'green' : 'blue'} onClick={handleClick}>
        {isCopied ? 'Copied!' : 'Copy Code'}
      </Button>
    </div>
  );
};

export default CopyCodeButton;
