import React from "react";
import styled from "styled-components";

const Section = styled.div`
  background: #f5f5f5;
  padding: 80px 20px;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: auto;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 50px;
  font-size: 32px;
  color:#4D148C;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;

  @media(max-width: 900px){
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  padding: 25px;
  border-radius: 12px;
  transition: 0.25s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.h4`
  margin: 0;
`;

const Role = styled.p`
  margin: 0;
  font-size: 14px;
  color: #777;
`;

const Text = styled.p`
  color: #555;
  line-height: 1.5;
`;

const TestimonialSection = () => {
  return (
    <Section>
      <Container>
        <Title>Testimonials</Title>

        <Grid>

          <Card>
            <User>
              <Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" />
              <div>
                <Name>Michael Johnson</Name>
                <Role>Business Owner</Role>
              </div>
            </User>
            <Text>
              Shipping has never been this easy. Fast delivery and reliable service every time.
            </Text>
          </Card>

          <Card>
            <User>
              <Avatar src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e" />
              <div>
                <Name>Sarah Williams</Name>
                <Role>E-commerce Seller</Role>
              </div>
            </User>
            <Text>
              I trust this service for all my deliveries. Everything arrives on time and in perfect condition.
            </Text>
          </Card>

          <Card>
            <User>
              <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" />
              <div>
                <Name>David Chen</Name>
                <Role>Entrepreneur</Role>
              </div>
            </User>
            <Text>
              Their global network is impressive. I ship internationally without any stress.
            </Text>
          </Card>

        </Grid>
      </Container>
    </Section>
  );
};

export default TestimonialSection;