export type ProductFiltersResult = {
    categoriesSlug: string[];
    search: string
};
export type NextPageProps<T = Record<string, string>> = {
  /**
   * The path parameters received 
   * e.g. : page/[slug] --> params.slug
   */
  params: T,
  /**
   * The HTTP query parameters received
   * e.g. : my-page?page=1 --> searchParams.page (= '1')
   */
  searchParams: { [key: string]: string | string[] | undefined }
};

export type ProductAttribute = {
  label : string,
  rating : number
}