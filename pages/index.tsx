
import  { GetServerSideProps } from  "next"
import {getMake,Make, } from  "../database/getMake"
import {Model } from  "../database/getModels"
import { getModels } from "../database/getModels"
import  {useRouter} from  "next/router"
import  {getAsString  }  from "./getAsString"
import { FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';


export interface HomeProps {
  makes: Make[];
  models:Model[];
}

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: 'auto',
    maxWidth: 500,
    padding: theme.spacing(3),
  },
}));

const prices = [500, 1000, 5000, 15000, 25000, 50000, 250000];

export default function Home({ makes,models }: HomeProps) {
  const classes = useStyles();
  const { query } = useRouter();

  console.log(models)
  const initialValues = {
    make: getAsString(query.make) || 'all',
    model: getAsString(query.model) || 'all',
    minPrice: getAsString(query.minPrice) || 'all',
    maxPrice: getAsString(query.maxPrice) || 'all',
  };

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ values }) => (
        <Form>
          <Paper elevation={5} className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="search-make">Make</InputLabel>
                  <Field
                    name="make"
                    as={Select}
                    labelId="search-make"
                    label="Make"
                  >
                    <MenuItem value="all">
                      <em>All Makes</em>
                    </MenuItem>
                    {makes.map((make) => (
                      <MenuItem value={make.make}>
                        {`${make.make} (${make.count})`}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                  <InputLabel id="search-make">model</InputLabel>
                  <Field
                    name="make"
                    as={Select}
                    labelId="search-make"
                    label="Model"
                  >
                    <MenuItem value="all">
                      <em>All Model</em>
                    </MenuItem>
                    {models.map((model) => (
                    <MenuItem key={model.model} value={model.model}>
                      {`${model.model} (${model.count})`}
                    </MenuItem>
                  ))}
                    
                  </Field>
                </FormControl>
              
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="search-min-price">Min Price</InputLabel>
                  <Field
                    name="minPrice"
                    as={Select}
                    labelId="search-min-price"
                    label="Min Price"
                  >
                    <MenuItem value="all">
                      <em>No Min</em>
                    </MenuItem>
                    {prices.map((price) => (
                      <MenuItem value={price}>{price}</MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                  <InputLabel id="search-max-price">Max Price</InputLabel>
                  <Field
                    name="maxPrice"
                    as={Select}
                    labelId="search-max-price"
                    label="Max Price"
                  >
                    <MenuItem value="all">
                      <em>No Max</em>
                    </MenuItem>
                    {prices.map((price) => (
                      <MenuItem value={price}>{price}</MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Form>
      )}
    </Formik>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const  make =  getAsString(ctx.query.make)
  console.log(make)
  const [makes, models] = await Promise.all([getMake(), getModels(make)]);

  return { props: { makes , models } };
};