import { Configuration, OpenAIApi } from 'openai';
import { useState, useEffect } from 'react';
import {
  Image as JssImage,
  ImageField,
  Field,
  LinkField,
  // useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

/********************************************************************
 *                        OpenAI API Configs                         *
 ********************************************************************/

const apikey = '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';

const configuration = new Configuration({
  apiKey: apikey,
  // organization: orgKey
});

const openai = new OpenAIApi(configuration);

/********************************************************************
 *                     SITECORE Component Fields                     *
 ********************************************************************/

interface Fields {
  Search: Field<string>;
  Image: ImageField;
  TargetUrl: LinkField;
  ImageCaption: Field<string>;
}

type DallAIProps = {
  params: { [key: string]: string };
  fields: Fields;
  rendering: { [key: string]: string };
};

/********************************************************************
 *                   OpenAI DALL-E Image Generator                   *
 ********************************************************************/

const imageGenerator = async (prompt: string) => {
  // Make the request to the DALL-E API using the openai library
  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: '512x512',
  });

  return response.data.data[0].url ?? '';
};

/********************************************************************
 *                        SITECORE Component                         *
 ********************************************************************/

const ImageAIGeneratedComponent = (props: DallAIProps): JSX.Element => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const id = props.rendering.uid;
  // const { sitecoreContext } = useSitecoreContext();
  const ImageDefault = () => <JssImage field={props.fields?.Image} src={imageUrl} />;

  if (props.fields) {
    const getImageUrl = async () => {
      const url = await imageGenerator(props.fields.Search.value ?? 'random');
      setImageUrl(url);
      
      props.fields.Search.value == 'random' ? sessionStorage.setItem('generatedUrl-random', url) : sessionStorage.setItem(`generatedUrl-${id}`, url);
    };

    useEffect(() => {
      const generatedUrl = props.fields.Search.value == 'random' ? sessionStorage.getItem('generatedUrl-random') : sessionStorage.getItem(`generatedUrl-${id}`);
      const p = sessionStorage.getItem(`prompt-${id}`);

      if (props.fields.Search.value == p && generatedUrl) {
        setImageUrl(generatedUrl);
      }

      if (props.fields.Search.value != p) {
        getImageUrl();
        sessionStorage.setItem(`prompt-${id}`, props.fields.Search.value);
      }

      if (props.fields?.Search.value != p && generatedUrl) {
        setImageUrl(generatedUrl);
      }
    }, []);

    // Default Image Component

    const Image = () => <JssImage field={props.fields.Image} src={imageUrl} />;
    // const id = props.params.RenderingIdentifier;

    if (props.fields.Image.value) {
      props.fields.Image.value.src = imageUrl;
    }

    return (
      <div className={`component image ${props.params.styles}`} id={id ?? undefined}>
        <div className="component-content">
          <Image />
        </div>
      </div>
    );
  }

  return <ImageDefault />;
};

export default ImageAIGeneratedComponent;
