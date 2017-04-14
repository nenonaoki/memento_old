// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import Helmet from 'react-helmet';
import _has from 'lodash/has';
import _assign from 'lodash/assign';
import * as tagActions from '../../../actions/tag';

import MediumResult from '../../molecules/mediumResult';
import Pager from '../../molecules/pager';

function mapStateToProps(state, ownProps) {
  return {
    isLogin: _has(state.account, 'payload'),
    location: ownProps.location,
    slug: ownProps.params.slug,
    tagState: state.tag,
  };
}

function mapDispatchToProps(dispatch/* , ownProps */) {
  return bindActionCreators(_assign(routerActions, tagActions), dispatch);
}

type Props = {
  isLogin: boolean,
  location: Object,
  router: Object,
  slug: string,
  tagState: Object,
  tagGet: Function,
  tagClear: Function,
};

class Tag extends Component {
  props: Props;

  componentWillMount() {
    const { slug, tagGet } = this.props;

    tagGet(slug);
  }

  componentWillUnmount() {
    this.props.tagClear();
  }

  render() {
    const {
      location,
      router,
      slug,
      tagState,
      tagGet,
    } = this.props;

    const media = tagState.media;

    const onRequestPage = (page) => {
      const path = page === 1 ? location.pathname : `${location.pathname}?p=${page}`;

      router.push(path);
      tagGet(slug, { p: page });
    };

    return (
      <div className="wrapper wrapper-content">
        {tagState.payload && <Helmet
          title={`"${tagState.payload.label}" - Tag`}
        />}
        <div className="row">
          <div className="col-md-8">
            <div className="ibox">
              <div className="ibox-title">
                <h3>
                  {media ? media.count : '0'} media tagged with{' '}
                  <span className="text-navy">"{tagState.payload && tagState.payload.label}"</span>
                </h3>
              </div>
              <div className="ibox-content">
                {tagState.payload && <p>{tagState.payload.description}</p>}
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
                {media && (
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
)(Tag);
