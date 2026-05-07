import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardMedia, 
  CardContent, 
  Grid, 
  Chip, 
  CircularProgress,
  Divider,
  Alert
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import GroupIcon from '@mui/icons-material/Group';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import axios from 'axios';
import dayjs from 'dayjs';

// Assuming base URL setup - adjust if your project has a global axios instance
const API_BASE_URL = 'http://localhost:5000/api';

const PersonalizedEvents = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [communityInsights, setCommunityInsights] = useState([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [loadingCommunity, setLoadingCommunity] = useState(false);
  const [error, setError] = useState('');

  // Setup Axios to throw credentials
  axios.defaults.withCredentials = true;

  const fetchCommunityInsights = async () => {
    setLoadingCommunity(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/recommendations/community-insights`);
      setCommunityInsights(res.data);
    } catch (err) {
      console.error("Failed to fetch community insights", err);
    } finally {
      setLoadingCommunity(false);
    }
  };

  const generateRecommendations = async () => {
    setLoadingAI(true);
    setError('');
    try {
      const res = await axios.get(`${API_BASE_URL}/recommendations/generate`);
      if (res.data.recommendedEvents) {
        setRecommendations(res.data.recommendedEvents);
      } else {
        setError("Failed to generate recommendations. Please ensure you have sufficient profile data.");
      }
    } catch (err) {
      console.error("Failed to generate AI recommendations", err);
      setError(err.response?.data?.message || "Error generating AI recommendations.");
    } finally {
      setLoadingAI(false);
    }
  };

  useEffect(() => {
    // Initial fetch to see if we have stored AI insights or just fetch community insights
    fetchCommunityInsights();
  }, []);

  const EventCard = ({ event, matchScore }) => {
    if (!event) return null;
    
    return (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', borderRadius: 2, boxShadow: 3, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' } }}>
        {matchScore && (
          <Chip 
            label={`${matchScore}% Match!`} 
            color="secondary" 
            sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1, fontWeight: 'bold' }} 
            icon={<AutoAwesomeIcon />}
          />
        )}
        <CardMedia
          component="img"
          height="160"
          image={event.bannerImage ? `http://localhost:5000/uploads/${event.bannerImage}` : "https://via.placeholder.com/400x200?text=Event+Image"}
          alt={event.eventName}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 600 }}>
            {event.eventName}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
             <CalendarMonthIcon sx={{ fontSize: 18, mr: 0.5 }} />
             <Typography variant="body2">
               {dayjs(event.eventDate).format('MMM D, YYYY')} at {event.startTime}
             </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
             <LocationOnIcon sx={{ fontSize: 18, mr: 0.5 }} />
             <Typography variant="body2">
               {event.eventLocation}, {event.city}
             </Typography>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {event.description}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* AI Recommendations Section */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 800, background: '-webkit-linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Crafted Just For You
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Discover events perfectly tailored to your unique interests and location using Gemini AI.
        </Typography>

        <Button 
          variant="contained" 
          size="large" 
          onClick={generateRecommendations}
          disabled={loadingAI}
          startIcon={loadingAI ? <CircularProgress size={20} color="inherit" /> : <AutoAwesomeIcon />}
          sx={{ borderRadius: 8, px: 4, py: 1.5, textTransform: 'none', fontSize: '1.1rem', mb: 4 }}
        >
          {loadingAI ? 'Analyzing Your Profile...' : 'Get Personalized Recommendations'}
        </Button>
        
        {error && <Alert severity="error" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>{error}</Alert>}

        {recommendations.length > 0 && (
          <Grid container spacing={4}>
            {recommendations.map((rec) => (
              <Grid item key={rec.event._id || rec.event} xs={12} sm={6} md={4}>
                <EventCard event={rec.event} matchScore={rec.matchScore} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Divider sx={{ my: 6 }}>
        <Chip icon={<GroupIcon />} label="Community Insights" size="medium" />
      </Divider>

      {/* Community Insights Section */}
      <Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
          Trending In Your Circle
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
          Events popular among users who share similar interests with you.
        </Typography>
        
        {loadingCommunity ? (
           <Box display="flex" justifyContent="center" my={4}>
             <CircularProgress />
           </Box>
        ) : communityInsights.length > 0 ? (
          <Grid container spacing={4}>
            {communityInsights.map((event) => (
              <Grid item key={event._id} xs={12} sm={6} md={3}>
                {/* Notice we don't pass matchScore here to differentiate from Personalized */}
                <EventCard event={event} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', my: 4 }}>
            No community data available yet. Be the first to start booking!
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default PersonalizedEvents;
