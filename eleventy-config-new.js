const { DateTime } = require("luxon");
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.ignores.add("src/post-layout.njk");

  eleventyConfig.addPassthroughCopy({ "static": "/" });
  const months = ["січня","лютого","березня","квітня","травня","червня","липня","серпня","вересня","жовтня","листопада","грудня"];
  eleventyConfig.addFilter("dateUkr", (d) => { const x = DateTime.fromJSDate(d,{zone:"utc"}); return `${x.day} ${months[x.month-1]} ${x.year}`; });
  eleventyConfig.addFilter("dateISO", (d) => DateTime.fromJSDate(d,{zone:"utc"}).toFormat("yyyy-LL-dd"));
  eleventyConfig.addCollection("posts", (c) => c.getFilteredByGlob("src/blog/*.md").sort((a,b)=>b.date-a.date));
  return { dir: { input: "src", output: "_site", includes: "." }, markdownTemplateEngine: "njk", htmlTemplateEngine: "njk" };
};
