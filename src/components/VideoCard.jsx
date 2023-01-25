import React, { Link } from "react-router-dom"
import { Typography, Card, CardContent, CardMedia } from "@mui/material"
import { CheckCircle } from "@mui/icons-material"
import {demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from '../utils/constants'
import { Stack } from "@mui/material"
import moment from "moment/moment"

const VideoCard = ({video : {id:{videoId}, snippet}}) => {

  return(
      <Card sx={{width: { xs: '100%', sm: '358px', md: "320px",} , borderShadow: 'none', borderRadius:0}}>
        {/* FOR IMAGE OR THUMBNAIL */}
          <Link  to={videoId ? `/video/${videoId}` : demoVideoUrl}>
            <CardMedia  
              image={snippet?.thumbnails?.high?.url}
              alt={snippet?.title}
              sx={{width:{ xs:'100%',sm:'358px', md:'320px'}, height: 180}}
            />
          </Link>
        
        {/* FOR CARD CONTENT   */}
          <CardContent sx={{ backgroundColor: '#1e1e1e', height:'106px'}}>
            {/* for video title */}
              <Link  to={videoId ? `/video/${videoId}` : demoVideoUrl}>
                  <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
                      {snippet?.title.slice(0,60) || demoVideoTitle.slice(0,60) }
                  </Typography>
              </Link>
            {/* for channel title */}
            <Stack>
              <Link  to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
                  <Typography variant="subtitle2" fontWeight="bold" color="grey">
                      {snippet?.channelTitle || demoChannelTitle}
                      <CheckCircle sx={{fontSize : 12, color: 'grey', ml:'5px'}}/>
                  </Typography>
              </Link>
              <Typography marginTop="10px" variant="subtitle2" fontWeight="bold" color="grey">{moment(snippet.publishedAt).utc().format('DD-MM-YYYY')}</Typography>
            </Stack>
          </CardContent>
      </Card>
  )

}

export default VideoCard