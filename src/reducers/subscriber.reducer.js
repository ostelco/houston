import _ from 'lodash';
import { handleActions } from 'redux-actions';
import { actions } from '../actions/subscriber.actions';

const defaultState = {};

export const subscribers = handleActions(
  {
    [actions.subscriberByEmailRequest]: (state, action) => ({
      loading: true
    }),
    [actions.subscriberByEmailSuccess]: (state, action) => action.payload, // Array of subscribers
    [actions.subscriberByEmailFailure]: (state, action) => ({
      ...action.payload
    })
  },
  defaultState
);

export const context = handleActions(
  {
    [actions.contextByEmailRequest]: (state, action) => ({
      loading: true
    }),
    [actions.contextByEmailSuccess]: (state, action) => ({
      ...action.payload
    }),
    [actions.contextByEmailFailure]: (state, action) => ({
      ...action.payload
    })
  },
  defaultState
);

export const approvedRegions = handleActions(
  {
    [actions.contextByEmailRequest]: (state, action) => ({
      loading: true
    }),
    [actions.contextByEmailSuccess]: (state, action) => {
      const regions = _.get(action.payload, 'regions', []);
      return _.filter(regions, { status: 'APPROVED' });
    },
    [actions.contextByEmailFailure]: (state, action) => ({
      ...action.payload
    })
  },
  defaultState
);

export const subscriptions = handleActions(
  {
    [actions.subscriptionsRequest]: (state, action) => ({
      loading: true
    }),
    [actions.subscriptionsSuccess]: (state, action) => ({
      items: action.payload
    }),
    [actions.subscriptionsFailure]: (state, action) => ({
      ...action.payload
    })
  },
  defaultState
);

export const bundles = handleActions(
  {
    [actions.bundlesRequest]: (state, action) => ({
      loading: true
    }),
    [actions.bundlesSuccess]: (state, action) => action.payload,
    [actions.bundlesFailure]: (state, action) => ({
      ...action.payload
    })
  },
  defaultState
);

export const paymentHistory = handleActions(
  {
    [actions.paymentHistoryRequest]: (state, action) => ({
      loading: true
    }),
    [actions.paymentHistorySuccess]: (state, action) => action.payload,
    [actions.paymentHistoryFailure]: (state, action) => ({
      ...action.payload
    })
  },
  defaultState
);

export const auditLogs = handleActions(
  {
    [actions.auditLogsRequest]: (state, action) => ({
      loading: true
    }),
    [actions.auditLogsSuccess]: (state, action) => action.payload,
    [actions.auditLogsFailure]: (state, action) => ({
      ...action.payload
    })
  },
  []
);

export const latestSim = handleActions(
  {
    [actions.provisionSimRequest]: (state, action) => ({
      loading: true
    }),
    [actions.provisionSimSuccess]: (state, action) => action.payload,
    [actions.provisionSimFailure]: (state, action) => ({
      ...action.payload
    }),
    //TODO remove later
    [actions.contextByEmailSuccess]: (state, action) => {
      const regions = _.get(action.payload, 'regions', []);
      const firstApproved = _.head(_.filter(regions, { status: 'APPROVED' }));
      console.log('handle latestSim, contextByEmailSuccess', firstApproved);
      if (firstApproved) {
        return firstApproved.simProfiles[0];
      }
      return defaultState;
    },
    [actions.subscriberByEmailRequest]: (state, action) => defaultState
  },
  defaultState
);

export const allSimProfiles = handleActions(
  {
    [actions.contextByEmailRequest]: (state, action) => ({
      loading: true
    }),
    [actions.contextByEmailSuccess]: (state, action) => {
      const regions = _.get(action.payload, 'regions', []);
      const approvedRegions = _.filter(regions, { status: 'APPROVED' });
      return _.flatMap(approvedRegions, region => {
        return region.simProfiles;
      });
    },
    [actions.contextByEmailFailure]: (state, action) => ({
      ...action.payload
    })
  },
  defaultState
);
