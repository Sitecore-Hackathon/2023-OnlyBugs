import { Configuration, OpenAIApi } from "openai";
import { useState, useEffect } from 'react';
import {
  Image as JssImage,
  RichText as JssRichText,
  Link as JssLink,
  ImageField,
  Field,
  LinkField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Search: Field<string>;
  Image: ImageField;
  TargetUrl: LinkField;
  ImageCaption: Field<string>;
}

type DallAIProps = {
  params: { [key: string]: string };
  fields: Fields;
}

//********************************************************

const apikey = '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';
const orgKey = 'org-ZnjAnbVGYPu1gyo4z6HncZVo';

const configuration = new Configuration({
    apiKey: apikey,
    organization: orgKey
});
const openai = new OpenAIApi(configuration);

const generateImages = async(prompt: string) => {

  // Make the request to the DALL-E API using the openai library
  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: '512x512',
  });

  console.log(response.data.data[0].url);

  return response.data.data[0].url ?? '';
}

const ImageGenerated = (props: DallAIProps): JSX.Element => {

  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const getImageUrl = async () => {
      const url = await generateImages(props.fields.Search.value ?? 'random');
      setImageUrl(url);
    };
    getImageUrl();
  }, [props.fields.Search.value]);

  const { sitecoreContext } = useSitecoreContext();
  let _src: string = '';

  generateImages(props.fields.Search.value).then((data) => {
    _src = data ?? '';
  });

  const ImageDefault = () => <JssImage field={props.fields.Image} />;

  if (props.fields) {

    const Image = () => <JssImage field={props.fields.Image} />;
    const id = props.params.RenderingIdentifier;

    return (
      <div className={`component image ${props.params.styles}`} id={id ?? undefined}>
        <div className='component-content'>
        {sitecoreContext.pageState === 'edit' ? (
            <Image />
          ) : (
            <div>
              {imageUrl && <img src={imageUrl} alt="Generated Image" />}
            </div>
          )}
        </div>
      </div>
    );
  }

  return <ImageDefault />;
};

export default ImageGenerated;