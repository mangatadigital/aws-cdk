import { Test } from 'nodeunit';
import { TagType } from '../lib/cfn-resource';
import { TagManager } from '../lib/tag-manager';

export = {
  '#setTag() supports setting a tag regardless of Type'(test: Test) {
    const notTaggable = new TagManager(TagType.NotTaggable, 'AWS::Resource::Type');
    notTaggable.setTag('key', 'value');
    test.deepEqual(notTaggable.renderTags(), undefined);
    test.done();
  },
  'when a tag does not exist': {
    '#removeTag() does not throw an error'(test: Test) {
      const mgr = new TagManager(TagType.Standard, 'AWS::Resource::Type');
      test.doesNotThrow(() => (mgr.removeTag('dne', 0)));
      test.done();
    },
    '#setTag() creates the tag'(test: Test) {
      const mgr = new TagManager(TagType.Standard, 'AWS::Resource::Type');
      mgr.setTag('dne', 'notanymore');
      test.deepEqual(mgr.renderTags(), [{key: 'dne', value: 'notanymore'}]);
      test.done();
    }
  },
  'when a tag does exist': {
    '#removeTag() deletes the tag'(test: Test) {
      const mgr = new TagManager(TagType.Standard, 'AWS::Resource::Type');
      mgr.setTag('dne', 'notanymore', 0);
      mgr.removeTag('dne', 0);
      test.deepEqual(mgr.renderTags(), undefined);
      test.done();
    },
    '#setTag() overwrites the tag'(test: Test) {
      const mgr = new TagManager(TagType.Standard, 'AWS::Resource::Type');
      mgr.setTag('dne', 'notanymore');
      mgr.setTag('dne', 'iwin');
      test.deepEqual(mgr.renderTags(), [{key: 'dne', value: 'iwin'}]);
      test.done();
    }
  },
  'when there are no tags': {
    '#renderTags() returns undefined'(test: Test) {
      const mgr = new TagManager(TagType.Standard, 'AWS::Resource::Type');
      test.deepEqual(mgr.renderTags(), undefined );
      test.done();
    },
  },
  '#renderTags() handles standard, map, and ASG tag formats'(test: Test) {
    const tagged: TagManager[] = [];
    const standard = new TagManager(TagType.Standard, 'AWS::Resource::Type');
    const asg = new TagManager(TagType.AutoScalingGroup, 'AWS::Resource::Type');
    const mapper = new TagManager(TagType.Map, 'AWS::Resource::Type');
    tagged.push(standard);
    tagged.push(asg);
    tagged.push(mapper);
    for (const res of tagged) {
      res.setTag('foo', 'bar');
      res.setTag('asg', 'only', 0, false);
    }
    test.deepEqual(standard.renderTags(), [
      {key: 'foo', value: 'bar'},
      {key: 'asg', value: 'only'},
    ]);
    test.deepEqual(asg.renderTags(), [
      {key: 'foo', value: 'bar', propagateAtLaunch: true},
      {key: 'asg', value: 'only', propagateAtLaunch: false},
    ]);
    test.deepEqual(mapper.renderTags(), {
      foo: 'bar',
      asg: 'only',
    });
    test.done();
  },
  'tags with higher or equal priority always take precedence'(test: Test) {
    const mgr = new TagManager(TagType.Standard, 'AWS::Resource::Type');
    mgr.setTag('key', 'myVal', 2);
    mgr.setTag('key', 'newVal', 1);
    test.deepEqual(mgr.renderTags(), [
      {key: 'key', value: 'myVal'},
    ]);
    mgr.removeTag('key', 1);
    test.deepEqual(mgr.renderTags(), [
      {key: 'key', value: 'myVal'},
    ]);
    mgr.removeTag('key', 2);
    test.deepEqual(mgr.renderTags(), undefined);
    test.done();
  },
  'excludeResourceTypes only tags resources that do not match'(test: Test) {
    const mgr = new TagManager(TagType.Standard, 'AWS::Fake::Resource');

    test.equal(false, mgr.applyTagAspectHere([], ['AWS::Fake::Resource']));
    test.equal(true, mgr.applyTagAspectHere([], ['AWS::Wrong::Resource']));

    test.done();
  },
  'includeResourceTypes only tags resources that match'(test: Test) {
    const mgr = new TagManager(TagType.Standard, 'AWS::Fake::Resource');

    test.equal(true, mgr.applyTagAspectHere(['AWS::Fake::Resource'], []));
    test.equal(false, mgr.applyTagAspectHere(['AWS::Wrong::Resource'], []));

    test.done();
  }
};
