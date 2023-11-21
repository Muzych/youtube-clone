import { Box, CardContent, CardMedia, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { demoProfilePicture } from '../utils/constants';

import { fetchFromAPI } from '../utils/fetchFromAPI';

const ChannelCard = ({ channelId }) => {

  const [Channel, setChannel] = useState('');

  useEffect(() => {
    
    fetchFromAPI(`channels?part=snippet&id=${channelId}`)
      .then((data) => {
        setChannel(data.items[0]);
      })
  }, [])

  return (
    <Box
      sx={{
        boxShadow: 'none',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: { xs: '356px', md: '320px' },
        height: '326px',
        margin: 'auto'
      }}
    >
      <Link to={`/channel/${Channel?.id}`}>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
            color: '#fff'
          }}>
          <CardMedia
            image={Channel?.snippet?.thumbnails?.high?.url || demoProfilePicture}
            alt={Channel?.snippet?.title}
            sx={{ borderRadius: '50%', height: '180px', width: '180px', mb: 2, border: '1px solid #e3e3e3' }}
          />
          <Typography variant='h6'>
            {Channel?.snippet?.title}
            <CheckCircle sx={{ fontSize: 14, color: 'gray', ml: '5px' }} />
          </Typography>
          {Channel?.statistics?.subscriberCount && (
            <Typography>
              {parseInt(Channel?.statistics?.subscriberCount).toLocaleString()} Subscribers
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  )
}



export default ChannelCard