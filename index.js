/**
 * @author daniel shen
 *
 * This application retrieves and prints information about the top five ice cream shops in Alpharetta, Georgia via Yelp Fusion API.
 * https://www.yelp.com/fusion
 *
 * Info:
 * o business name: name
 * o business address (street, city): location.display_address
 * o excerpt from a review of that business: *fetch review*
 * o name of the person that wrote the review
 * o business information should be output in the order received from the API response
 */

const yelp = require("yelp-fusion");

const apiKey =
  "i_fikekCPtYF6jBRktQlyvtfG2DjHh6lyTd3JQvw-wDhP68ZefygM-WAZBj2XxgrrTCDjPTLSozResZEtNtSRKnCrfiI6203_HKu3-BfOYK0sSmg4tMX3tgmIH2RYHYx";

const searchRequest = {
  term: "Ice Cream",
  location: "alpharetta, ga",
  limit: 5,
  sort_by: "rating",
};

const client = yelp.client(apiKey);

module.exports = (async () => {
  let response;
  try {
    response = await client.search(searchRequest);
    const businesses = response.jsonBody.businesses;
    console.log("Here are the top five ice cream shops in Alpharetta, Georgia:\n")
    // Use for loop to ensure printing order.
    for (const [i, business] of businesses.entries()) {
      console.log(`${i + 1}: ${business.name}`);
      console.log(business.location.display_address.join(' '));
      // Query for a selected review.
      let reviewsResponse;
      try {
        reviewsResponse = await client.reviews(business.id);
        const reviews = reviewsResponse.jsonBody.reviews;
        // Display the 1st review.
        first = reviews[0];
        console.log(`${first.user.name} commented:\n"${first.text}".\n`)
      } catch (e) {
        throw `Error fetching reviews for ${business.name}: ` + e;
      }
    }
  } catch (e) {
    console.log("Error fetching businesses: " + e);
  }
})();
