import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import { Avatar, Box, Button, Grid } from "@mui/material";
import LazyImage from "components/LazyImage";
import BazaarRating from "components/BazaarRating";
import { H1, H2, H3, H6 } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import { FlexBox, FlexRowCenter } from "../flex-box";
//================================================================

// ================================================================
const BookIntro = ({ data }) => {
  const { trade_uid, sell_price, title, sell_state, image, name, user_uid } =
    data;
  const { state, dispatch } = useAppContext();
  const [selectedImage, setSelectedImage] = useState(0); // CHECK PRODUCT EXIST OR NOT IN THE CART

  const cartItem = state.cart.find((item) => item.trade_uid === trade_uid); // HANDLE SELECT IMAGE

  const handleImageClick = (ind) => () => setSelectedImage(ind); // HANDLE CHANGE CART

  const handleCartAmountChange = (amount) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price,
        qty: amount,
        name: title,
        imgUrl: image,
        trade_uid,
      },
    });
  };

  return (
    <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item md={6} xs={12} alignItems="center">
          <FlexBox justifyContent="center" mb={6}>
            <LazyImage
              alt={title}
              width={300}
              height={300}
              loading="eager"
              objectFit="contain"
              src={image}
            />
            {/* <Image
              src="http://image.yes24.com/goods/115032356/XL"
              width={300}
              height={300}
            /> */}
          </FlexBox>

          {/* <FlexBox overflow="auto">
            {images.map((url, ind) => (
              <FlexRowCenter
                key={ind}
                width={64}
                height={64}
                minWidth={64}
                bgcolor="white"
                border="1px solid"
                borderRadius="10px"
                ml={ind === 0 ? "auto" : 0}
                style={{
                  cursor: "pointer",
                }}
                onClick={handleImageClick(ind)}
                mr={ind === images.length - 1 ? "auto" : "10px"}
                borderColor={
                  selectedImage === ind ? "primary.main" : "grey.400"
                }
              >
                <Avatar
                  src={url}
                  variant="square"
                  sx={{
                    height: 40,
                  }}
                />
              </FlexRowCenter>
            ))}
          </FlexBox> */}
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb={2}>{title}</H1>

          <FlexBox alignItems="center" mb={2}>
            <Box>????????????:</Box>
            <H6 ml={1}>{name}</H6>
          </FlexBox>

          <FlexBox alignItems="center" mb={2}>
            <Box lineHeight="1">Rated:</Box>
            <Box mx={1} lineHeight="1">
              <BazaarRating
                color="warn"
                fontSize="1.25rem"
                value={4}
                readOnly
              />
            </Box>
            <H6 lineHeight="1">(50)</H6>
          </FlexBox>

          <Box mb={3}>
            <H2 color="primary.main" mb={0.5} lineHeight="1">
              {sell_price}???
            </H2>
            <Box color="inherit">{sell_state}</Box>
          </Box>

          {!cartItem?.qty ? (
            <Button
              color="primary"
              variant="contained"
              onClick={handleCartAmountChange(1)}
              sx={{
                mb: 4.5,
                px: "1.75rem",
                height: 40,
              }}
            >
              ????????????
            </Button>
          ) : (
            <FlexBox alignItems="center" mb={4.5}>
              <Button
                size="small"
                sx={{
                  p: 1,
                }}
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.qty - 1)}
              >
                <Remove fontSize="small" />
              </Button>

              <H3 fontWeight="600" mx={2.5}>
                {cartItem?.qty.toString().padStart(2, "0")}
              </H3>

              <Button
                size="small"
                sx={{
                  p: 1,
                }}
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.qty + 1)}
              >
                <Add fontSize="small" />
              </Button>
            </FlexBox>
          )}

          <FlexBox alignItems="center" mb={2}>
            <Box>?????????:</Box>
            <Link href="/shops/fdfdsa">
              <a>
                <H6 ml={1}>{user_uid}</H6>
              </a>
            </Link>
          </FlexBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookIntro;
