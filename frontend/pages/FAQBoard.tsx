import React from "react";
import { Grid, Box, CssBaseline } from "@mui/material";
import HeaderNav from '../components/headernav.tsx';
import { DRAWER_WIDTH } from "../constants";
import { theme } from '../theme.ts'
import { List, ListItem, Avatar, ListItemAvatar, ListItemText, Divider, Typography, ThemeProvider, Card, Paper, IconButton, InputBase, Select, MenuItem, OutlinedInput, SelectChangeEvent, Button, InputLabel, FormControl } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CommunityResourcesPanel from "../components/communityResourcesPanel";
import EastIcon from '@mui/icons-material/East';
import CustomSelect from "../components/customSelect";

export default function FAQBoard() {

  const questions = [
    {
      author: "Michelle Minns",
      authorType: "Instructor",
      title: "Tips for connecting to database while using PHP",
      numReplies: 4,
      date: "Nov 21",
      time: "3:30 PM",
      week: 1,
      topics: ["PHP"],
      pinned: false
    },
    {
      author: "Theseus Lim",
      authorType: "Student",
      title: "How do I center a DIV???",
      numReplies: 2,
      date: "Nov 22",
      time: "4:20 PM",
      week: 1,
      topics: ["HTML", "CSS"],
      pinned: false
    },
    {
      author: "Joe Speed",
      authorType: "Student",
      title: "Who is Shark Meldon???",
      numReplies: 1,
      date: "Nov 22",
      time: "4:20 PM",
      week: 2,
      topics: ["Administrative"],
      pinned: false
    },
    {
      author: "Sam Smith",
      authorType: "Student",
      title: "What is an array?",
      numReplies: 0,
      date: "Nov 22",
      time: "4:20 PM",
      week: 2,
      topics: ["JavaScript"],
      pinned: false
    },
    {
      author: "Joe Speed",
      authorType: "Student",
      title: "Are we living in a simulation?",
      numReplies: 2,
      date: "Nov 22",
      time: "4:20 PM",
      week: 3,
      topics: ["Administrative"],
      pinned: false
    },
  ]

  const weeks = ["All Weeks"].concat(Array.from(new Set(questions.map(question => `Week ${question.week}`))))
  const [week, setWeek] = React.useState<string>(weeks[0]);

  const topics = ["All Topics"].concat(Array.from(new Set(questions.reduceRight((accumulator, question) => accumulator.concat(question.topics), []))))
  const [topic, setTopic] = React.useState<string>("All Topics");

  const [searchQuery, setSearchQuery] = React.useState<string>("");

  // Filter functions
  const filterWeek = question => {
    return (week == "All Weeks") || (week == `Week ${question.week}`)
  }

  const filterTopic = question => {
    return (topic == "All Topics") || (question.topics.includes(topic))
  }

  const filterSearch = question => {
    return searchQuery == "" || JSON.stringify(question).toUpperCase().includes(searchQuery.toUpperCase())
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <HeaderNav currentPageTitle="FAQ Board" />

        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` } }}
        >
          <Grid sx={{ paddingTop: '50px' }} container spacing={2}>
            <Grid item md={9} xs={12}>
              <Box sx={{ padding: "40px 0 30px 0" }}>
                <Grid container>
                  <Grid xs={8}>
                    <Typography variant="h1">
                      Community Forum
                    </Typography>
                    <Typography variant="subtitle1">
                      Ask a question or help out your fellow classmates!
                    </Typography>
                  </Grid>
                  <Grid xs={4}>
                    <Box sx={{ float: "right" }}>
                      <Button sx={{marginRight: "10px"}} variant="secondary">
                        My Questions
                      </Button>
                      <Button variant="primary">
                        Ask a Question
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ paddingBottom: '20px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <Paper
                      component="form"
                      sx={{
                        p: '2px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        borderRadius: '10px',
                        border: "1px solid rgba(0, 0, 0, 0.23)",
                        boxShadow: "0"
                      }}
                    >
                      <IconButton sx={{ p: '10px', color: "#6A5DF9" }} aria-label="menu">
                        <SearchIcon />
                      </IconButton>
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search"
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchQuery}
                        onChange={event => setSearchQuery(event.target.value)}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <CustomSelect
                      value={week}
                      handleChange={event => { setWeek(event.target.value) }}
                      choices={weeks}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <CustomSelect
                      value={topic}
                      handleChange={event => { setTopic(event.target.value) }}
                      choices={topics}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item md={3} xs={0}>
              {/* Filler */}
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item md={9} xs={12}>
              <Card sx={{ borderRadius: '10px' }}>
                <List sx={{ padding: '0 20px 20px 20px' }}>
                  {questions.filter(filterWeek).filter(filterTopic).filter(filterSearch).map(question =>
                    <>
                      <ListItem sx={{ padding: '40px 20px 40px 20px' }}>
                        <ListItemAvatar sx={{ width: '70px' }}>
                          <Avatar sx={{ height: '50px', width: '50px' }} src="sharkMeldon.png" />
                        </ListItemAvatar>
                        <ListItemText style={{ cursor: 'pointer' }}>
                          <Typography variant="subtitle2">
                            {question.authorType} · {question.author} · {question.date} · {question.time}
                          </Typography>
                          <Typography variant="h4">
                            {question.title}
                          </Typography>
                          <Typography variant="subtitle2" sx={{ fontWeight: "400" }} >
                            {question.numReplies} {question.numReplies == 1 ? "reply" : "replies"}
                          </Typography>
                        </ListItemText>
                      </ListItem>
                      <Divider component="li" />
                    </>
                  )}
                </List>
              </Card>
            </Grid>
            <Grid item md={3} xs={12}>
              <Box>
                <Typography variant="h3">
                  Still Confused?
                </Typography>
                <Box sx={{ marginTop: '15px' }}>
                  <Button variant="secondary" sx={{ "width": "100%" }}>
                    Go to Office Hours <EastIcon />
                  </Button>
                </Box>
              </Box>
              <Box>
                <CommunityResourcesPanel />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider >

  );
}
