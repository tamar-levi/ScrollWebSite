import * as React from 'react';
import { Box, Typography, Grid, Paper, IconButton } from '@mui/material';
import { Book, LibraryBooks, History } from '@mui/icons-material';

export default function About() {
  return (
    <Box sx={{ padding: '40px', backgroundColor: '#f9f9f9' }}>
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontFamily: 'Rubik, sans-serif',
          fontWeight: 700,
          marginBottom: 4,
          color: '#3f3f3f',
        }}
      >
        אודות האתר
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              backgroundColor: '#ffffff',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              borderRadius: '8px',
            }}
          >
            <IconButton sx={{ fontSize: '40px', color: '#3f51b5' }}>
              <Book />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Rubik, sans-serif',
                fontWeight: 600,
                color: '#3f3f3f',
                marginTop: 2,
                marginBottom: 1,
              }}
            >
              מוצרי מגילות וכתבים
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'Rubik, sans-serif',
                color: '#555',
                textAlign: 'center',
              }}
            >
              אנו מציעים מגוון רחב של מגילות, כתבים וספרי תורה איכותיים המיוצרים בעבודת יד, תוך שמירה על המסורת היהודית וערכיה.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              backgroundColor: '#ffffff',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              borderRadius: '8px',
            }}
          >
            <IconButton sx={{ fontSize: '40px', color: '#3f51b5' }}>
              <LibraryBooks />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Rubik, sans-serif',
                fontWeight: 600,
                color: '#3f3f3f',
                marginTop: 2,
                marginBottom: 1,
              }}
            >
              הצטרפות למכירה
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'Rubik, sans-serif',
                color: '#555',
                textAlign: 'center',
              }}
            >
              אנו מספקים פלטפורמה פשוטה ויעילה לכל מי שמעוניין להציע את מוצריו למכירה, תוך שמירה על שקיפות והוגנות.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              backgroundColor: '#ffffff',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              borderRadius: '8px',
            }}
          >
            <IconButton sx={{ fontSize: '40px', color: '#3f51b5' }}>
              <History />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Rubik, sans-serif',
                fontWeight: 600,
                color: '#3f3f3f',
                marginTop: 2,
                marginBottom: 1,
              }}
            >
              מסורת יהודית וערכים
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'Rubik, sans-serif',
                color: '#555',
                textAlign: 'center',
              }}
            >
              אנו שואפים לחזק את המסורת היהודית ולקדם את הערכים שלה, תוך שמירה על איכות, מקצועיות, והיסטוריה יהודית עשירה.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 5, textAlign: 'center' }}>
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Rubik, sans-serif',
            color: '#555',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.8,
          }}
        >
          האתר שלנו לא רק מציע מוצרים, אלא גם יוצר קהילה של אנשים שמחוברים לאותה תרבות וערכים. אנו מאמינים שדרך המסורת וההיסטוריה שלנו נוכל ליצור חוויית קנייה ומכירה שתהיה מבוססת על כבוד הדדי וקהילתיות. בין אם אתם מחפשים מגילה מיוחדת, ספר תורה חדש או פשוט מעוניינים לשתף את מה שאתם אוהבים, הגעתם למקום הנכון.
        </Typography>
      </Box>
    </Box>
  );
}
