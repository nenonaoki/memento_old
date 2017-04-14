// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import Helmet from 'react-helmet';
import _assign from 'lodash/assign';
import * as searchActions from '../../../actions/search';

import Tag from '../../atoms/tag';
import MediumResult from '../../molecules/mediumResult';
import Pager from '../../molecules/pager';

function mapStateToProps(state, ownProps) {
  return {
    location: ownProps.location,
    searchState: state.search,
  };
}

function mapDispatchToProps(dispatch/* , ownProps */) {
  return bindActionCreators(_assign(routerActions, searchActions), dispatch);
}

type Props = {
  location: Object,
  router: Object,
  searchState: Object,
  searchGet: Function,
  searchClear: Function,
  searchQueryInput: Function,
};

class Search extends Component {
  props: Props;

  componentWillMount() {
    this.componentInit(this.props);
  }

  componentWillUpdate(nextProps) {
    const query = this.props.location.query;
    const nextQuery = nextProps.location.query;

    if ((query.q !== nextQuery.q) || (query.p !== nextQuery.p)) {
      this.componentInit(nextProps);
    }
  }

  componentInit(props) {
    const { location, searchGet, searchClear, searchQueryInput } = props;

    searchClear();
    searchQueryInput(location.query.q);
    searchGet({
      q: location.query.q,
      p: location.query.p,
    });
  }

  render() {
    const {
      location,
      router,
      searchState,
    } = this.props;

    const tags = searchState.tags;
    const media = searchState.media;

    const onRequestPage = (page) => {
      let path = `${location.pathname}?q=${location.query.q}`;
      if (page !== 1) {
        path += `&p=${page}`;
      }
      router.push(path);
    };

    return (
      <div className="wrapper wrapper-content">
        <Helmet
          title={`"${location.query.q}" - Seach results`}
        />
        <div className="row">
          <div className="col-md-8">
            <div className="ibox">
              <div className="ibox-title">
                <h3>
                  {media ? media.count : '0'} results found for:{' '}
                  <span className="text-navy">"{location.query.q}"</span>
                </h3>
              </div>
              <div className="ibox-content">
                {tags && tags.payload.length > 0 && (
                  <ul className="tag-list no-padding clearfix">
                    {tags.payload.map(tag => (
                      <li key={tag.id}><Tag slug={tag.slug}>{tag.label}</Tag></li>
                    ))}
                  </ul>
                )}
                <div className="hr-line-dashed"></div>
                {media && media.payload.map(medium => (
                  <MediumResult
                    key={medium.id}
                    token={medium.token}
                    title={medium.title}
                    description={medium.description}
                    image={medium.image}
                  />
                ))}
                {media && media.count > 0 && (
                  <Pager
                    pageCount={Math.ceil(media.count / media.per)}
                    pageCurrent={media.page}
                    onClickButton={onRequestPage}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="ibox">
              <div className="ibox-title">
                <h5>Advertising</h5>
              </div>
              <div className="ibox-content">
                <div className="image-imitation">[Banneer 1]</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
