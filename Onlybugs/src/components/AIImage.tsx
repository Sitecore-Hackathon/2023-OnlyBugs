import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { url } from 'inspector';
import { ComponentProps } from 'lib/component-props';
import { Configuration, OpenAIApi } from 'openai';
import React, { useState, useEffect } from 'react';
const apikey = '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';
const configuration = new Configuration({
  apiKey: apikey,
});
const openai = new OpenAIApi(configuration);
type AIImageProps = {
  params: { [key: string]: string };
  rendering: { [key: string]: string };
  fields: Fields;
};
interface Fields {
  Description: Field<string>;
}
const generateImages = async (desc: string) => {
  // Make the request to the DALL-E API using the openai library
  const response = await openai.createImage({
    prompt: desc,
    n: 1,
    size: '512x512',
  });
  return response.data.data[0].url ?? '';
};
const AIImage = (props: AIImageProps): JSX.Element => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const id = props.rendering.uid;
  console.log(id);
  const getImageUrl = async () => {
    const url = await generateImages(props.fields.Description.value ?? 'random');
    setImageUrl(url);
    sessionStorage.setItem(id, url);
  };
  useEffect(() => {
    const generatedURL = sessionStorage.getItem(id) ?? '';
    console.log(generatedURL);
    if (generatedURL == '') {
      getImageUrl();
    } else {
      setImageUrl(generatedURL);
    }
  }, [props.fields.Description.value]);
  return <div>{<img id={id ? id : undefined} src={imageUrl} alt="AI Generated Image" />}</div>;
};
export default AIImage;
