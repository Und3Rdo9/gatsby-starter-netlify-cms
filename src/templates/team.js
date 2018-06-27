import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import Content, { HTMLContent } from '../components/Content';
import Tabs from '../components/Tabs';

export const TeamTemplate = ({
  content,
  contentComponent,
  description,
  title,
  photo,
  helmet
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <img src={photo} />
            <p>{description}</p>
            <Tabs/>
            <h2>Algemeen</h2>
            <PostContent content={content} />
            <h2>Competitie</h2> 
          </div>
        </div>
      </div>
    </section>
  );
};

TeamTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.instanceOf(Helmet)
};

const Team = ({ data }) => {
    console.log(data);
     const { team: post } = data;

  return (
    <TeamTemplate
      content={post.html}
      contentComponent={HTMLContent}
      description={post.frontmatter.description}
      helmet={<Helmet title={`${post.frontmatter.title} | Blog`} />}
      tags={post.frontmatter.tags}
      title={post.frontmatter.title}
      photo={post.frontmatter.photo}
    />
  );
};

Team.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default Team;

export const teamQuery = graphql`
  query TeamBySlug($slug: String!) {
    team: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
        description
        photo
        indoorId
        outdoorId
        players {
            name
            photo
            public
        }
      }
    }
   
  }
`;

// practices: markdownRemark(frontmatter: { trainings: { in: { teams: { in: { team: { eq: $slug } } } } }) {
//     frontmatter {
//         trainings {
//             trainingTeams
//             day
//             time
//             trainer
//             remarks
//         }
//     }
// }
