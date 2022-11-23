module.exports = {
  URL: (img) => {
    console.log(img);
    let strImg = img.toString();
    let cloudImage = strImg.replace(
      /won98.s3.amazonaws.com/g,
      "d2w4oam72zi5gn.cloudfront.net"
    );
    console.log(cloudImage);
    let strCloudFront = cloudImage.toString();
    return strCloudFront;
  },
};
