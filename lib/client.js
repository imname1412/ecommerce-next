import sanityClient  from "@sanity/client";
import imageUrlBuilder  from "@sanity/image-url";


export const client = sanityClient({
    projectId: process.env.NEXT_PUBLIC_PRODUCT_ID,
    dataset: 'production',
    apiVersion: '2022-07-13',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_TOKEN,
    ignoreBrowserTokenWarning: true
})


const builder = imageUrlBuilder(client)


export const urlFor = (src) => builder.image(src)