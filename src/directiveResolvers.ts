import { ContextParameters } from '../node_modules/graphql-yoga/dist/types';
import { AuthError, getUserId, getUserIp, gun } from './utils';
import { User } from '../db/entity';
import 'gun/lib/then.js'
export const isAuthenticated = async (next, _, __, ctx: ContextParameters) => {
	const hasUser = getUserId(ctx) && (await User.findOne(getUserId(ctx)));
	if (hasUser) return next();
	else throw new AuthError();
};

// delta: 对应时间段,以秒为单位 times: 对应时间段可以调用几次 key: 不同接口的表示
export const rateLimit = async (
	next,
	_,
	args: { times: number; delta: number; key: string },
	ctx: ContextParameters
) => {
	// 忽略管理员操作
	if (getUserId(ctx) && (await User.findOne(getUserId(ctx)))) {
		return next();
	}
	const user = gun.get('ipPool').get(getUserIp(ctx)).get(args.key);
	const curTimes = user.get('times');
	const curTimesData = (await curTimes.then()) || 0;
	const curDelta = user.get('delta');
	const curDeltaData = (await curDelta.then()) || 0;
	const now = Math.floor(new Date().getTime() / 1000);
	if (now - curDeltaData > args.delta) {
		curDelta.put(now);
		curTimes.put(1);
	} else {
		if (curTimesData > args.times) throw Error('接口超过调用次数限制');
		else curTimes.put(curTimesData + 1);
	}
	return next();
};
