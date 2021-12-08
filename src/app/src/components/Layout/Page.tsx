import React from 'react';
import { Typography, Breadcrumbs, Link, Grid, Box } from '@mui/material';
import useMobileService from '../../utils/mobileService';

export type BreadcrumbDef = { name: string; href?: string; icon?: JSX.Element }[];

type Props = {
  children: React.ReactNode;
  title?: React.ReactNode;
  showTitleOnMobile?: boolean;
  breadcrumbs?: BreadcrumbDef;
  className?: string;
};

export default function Page(props: Props) {
  const isMobile = useMobileService();
  const { children, title, breadcrumbs, className, showTitleOnMobile } = props;
  return (
    <Box flex={1} style={{ paddingLeft: 8, paddingRight: 8, paddingTop: 8 }}>
      <Grid container className={className || 'main'}>
        <Grid container className='header'>
          <Grid item>
            {title &&
              (showTitleOnMobile || !isMobile) &&
              (typeof title === 'string' ? <h1 className='title'>{title}</h1> : title)}
          </Grid>
          <Grid item>
            {breadcrumbs && (
              <Breadcrumbs maxItems={3} aria-label='breadcrumb' style={{ minHeight: 36 }}>
                {breadcrumbs.map(({ name, href }, index) => {
                  return index < breadcrumbs.length - 1 ? (
                    <Link key={`${name}-${index}`} color='inherit' href={href}>
                      {name}
                    </Link>
                  ) : (
                    <Typography key={`${name}-${index}`} color='textPrimary'>
                      {name}
                    </Typography>
                  );
                })}
              </Breadcrumbs>
            )}
          </Grid>
        </Grid>
        <Box flex={1}>{children}</Box>
      </Grid>
    </Box>
  );
}
