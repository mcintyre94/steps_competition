import Head from "next/head";
import { getApiKey, getGraphJSONProject } from "../lib/env";
import * as graphjson from "../lib/graphjson";

export async function getStaticProps() {
  const apiKey = getApiKey();
  const graphJSONProject = getGraphJSONProject();
  const splitIframeUrl = await graphjson.makeStepsComparisonIframeUrl(
    apiKey,
    graphJSONProject
  );
  const barChartIframeURl = await graphjson.makeStepsTotalIframeUrl(
    apiKey,
    graphJSONProject
  );

  return {
    props: {
      splitIframeUrl,
      barChartIframeURl
    },
  };
}

type IframeProps = {
  url: string;
};

function Iframe({ url }: IframeProps) {
  return (
    <iframe
      className="bg-white p-2 shadow-md border border-blue-100 w-full md:w-3/4"
      height="600px"
      src={url}
    ></iframe>
  );
}

type HomeProps = {
  splitIframeUrl: string;
  barChartIframeURl: string;
};

export default function Home({ splitIframeUrl, barChartIframeURl }: HomeProps) {
  return (
    <>
      <Head>
        <title>The Steps Competition!</title>
        <meta name="description" content="The steps competition!" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <div className="flex flex-col gap-y-4 items-center justify-center p-4">
        <h1 className="prose prose-2xl text-blue-600">The Steps Competition</h1>

        <Iframe url={splitIframeUrl}></Iframe>

        <Iframe url={barChartIframeURl}></Iframe>
      </div>
    </>
  );
}
