import React, { useState, useEffect } from "react"
import { Link ,useParams } from "react-router-dom"
import { Box, Stack, Typography} from '@mui/material'
import { CheckCircle } from "@mui/icons-material"
import ReactPlayer from "react-player"
import moment from "moment/moment"


import { Videos, Loader} from './'
import { fetchFromAPI } from "../utils/fetchFromAPI"

const VideoDetail = () => {

  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data)=> setVideoDetail(data.items[0]))

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data)=> setVideos(data.items))
  }, [id])

  if (!videoDetail?.snippet) return <Loader/>

  const { snippet: { title, channelId, channelTitle, publishedAt }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    
    <Box minHeight="95vh">
      
      <Stack direction={{xs:"column", md:"row"}}>
        <Box flex={1}>
          <Box sx={{width:"100%", position:"sticky", top:"86px"}}>
            <ReactPlayer style={{border:'1px solid grey'}} url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player" controls/>
            <Typography  color="#fff" variant="h5"   fontWeight="bold" p={2} >
              {title}
            </Typography>
            <Stack direction="column"  justifyContent="space-between" sx={{color:'#fff'}} py={1} px={2}>
              <Link to={`/channel/${channelId}`}>
                
                <Typography borderRadius="20px" border="1px solid grey" padding="10px" variant={{sm:'subtitle1', md:'h6'}} color="#fff">
                  {channelTitle} 
                  <CheckCircle sx={{fontSize:"12px", color:'grey', ml:'5px'}}/>
                </Typography>
              </Link>
              <Stack direction="row" marginTop="20px" gap="20px" alignItems="center">
                <Typography varient="body1" sx={{ opacity:0.7}}>{parseInt(viewCount).toLocaleString()} views</Typography>
                <Typography varient="body1" sx={{ opacity:0.7}}>{parseInt(likeCount).toLocaleString()} likes</Typography>
                <Typography varient="body1" sx={{ opacity:0.7}}>{moment(publishedAt).utc().format('DD-MM-YYYY')}</Typography>
              </Stack>

            </Stack>
            
           
          </Box>
        </Box>


        <Box px={2} py={{md:1, xs:5}} justifyContent="center" alignItems="center">
        <Typography marginBottom="10px"  borderRadius="20px" border="1px solid grey" padding="10px" color="#3febe392">
                  Related Videos : 
                  
                </Typography>
          <Videos videos={videos} direction={{sm:'row', md:'column'}}/>
        </Box>
      </Stack>
    </Box>
  )
}

export default VideoDetail

