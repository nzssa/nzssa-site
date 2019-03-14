import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'react-emotion';
import { HomeHeader, Header, PostList } from 'components';
import { Layout } from 'layouts';
// import backpackGirl from '../../static/backpackGirl.svg';
// import stars from '../../static/stars.svg';
import logo from '../../static/logo/white-logo.png';

const PostWrapper = styled.div`
  top: 600px;
  background: #000000;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  place-content: space-between space-evenly;
  margin: 2rem 4rem 1rem 4rem;
  @media (max-width: 1000px) {
    margin: 2rem 2rem 1rem 2rem;
  }
  @media (max-width: 700px) {
    margin: 2rem 1rem 1rem 1rem;
  }
`;

const Image2 = styled.img`
  background-color: #000000;
  position: absolute;
  top: 100px;
  left: 100px;
  z-index: 1;
`;

const Subheading = styled.h2`
  font-family: 'Rubik', sans-serif;
  margin: 0 6rem;
`;

const Index = ({ data }) => {
  return (
    <Layout>

      <Image2
        src={logo}
        styles={'background-color: #000000'}
        alt={'logo'}
        height={'500px'}
        alt={'backpackGirl'}
        // height={'500px'}
        width={'35%'}
        height={'auto'}
        align="left"
      />
      <Helmet title={'Home Page'} />
      < br />< br />< br />< br />< br />< br />
      <HomeHeader title="New Zealand Students' Space Association">
        Be bold. Have fun. Build a better world.
      </HomeHeader>
      <Subheading>Upcoming Events</Subheading>

      <hr css={{ width: '230px', border: '0.5px solid white', marginLeft: '6rem', marginTop: '1rem' }} />
      <PostWrapper>
        {data.upcomingEvents.edges.map(({ node }) => (
          <PostList
            key={node.id}
            cover={node.frontmatter.cover.childImageSharp.fluid}
            path={node.frontmatter.path}
            title={node.frontmatter.title}
            location={node.frontmatter.location}
            author={node.frontmatter.author}
            date={node.frontmatter.date}
            excerpt={node.excerpt}
          />
        ))}
      </PostWrapper>
      <Subheading>Blog Posts</Subheading>
      <hr css={{ width: '140px', border: '0.5px solid white', marginLeft: '6rem', marginTop: '1rem' }} />
      <PostWrapper>
        {data.blogPosts.edges.map(({ node }) => (
          <PostList
            key={node.id}
            cover={node.frontmatter.cover.childImageSharp.fluid}
            path={node.frontmatter.path}
            title={node.frontmatter.title}
            author={node.frontmatter.author}
            date={node.frontmatter.date}
            excerpt={node.excerpt}
          />
        ))}
      </PostWrapper>
    </Layout>
  );
};

export default Index;

Index.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            excerpt: PropTypes.string,
            frontmatter: PropTypes.shape({
              cover: PropTypes.object.isRequired,
              path: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
              tags: PropTypes.array,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
};

export const query = graphql`
  query {
    upcomingEvents: allMarkdownRemark(
      limit: 3
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fileAbsolutePath: { regex: "/(/content/events)/.*\\.md$/" } }
    ) {
      edges {
        node {
          ...contentFieldsEvent
        }
      }
    }
    
      blogPosts: allMarkdownRemark(
      limit: 3
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fileAbsolutePath: { regex: "/(/content/posts)/.*\\.md$/" } }
    ) {
      edges {
        node {
          ...contentFields
        }
      }
    }
  }
  
  fragment contentFields on MarkdownRemark {
            id
          excerpt(pruneLength: 75)
          frontmatter {
            title
            author
            path
            tags
            date
            cover {
              childImageSharp {
                fluid(
                  maxWidth: 1000
                  quality: 90
                  traceSVG: { color: "#2B2B2F" }
                ) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
  }
  
    fragment contentFieldsEvent on MarkdownRemark {
            id
          excerpt(pruneLength: 75)
          frontmatter {
            title
            author
            path
            tags
            date
            location
            cover {
              childImageSharp {
                fluid(
                  maxWidth: 1000
                  quality: 90
                  traceSVG: { color: "#2B2B2F" }
                ) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
  }
`;
