require('sylvester');
var vows = require('vows'),
    assert = require('assert'),
    glm = require('../glm');

var suite = vows.describe('families');

suite.addBatch({
  "binomial": {
    topic: function() { return glm.families.Binomial; },
    "should properly return a starting mu value": function (binomial) {      
      assert.deepEqual(binomial().initialMu([0.5, 1.5]), $V([0.5, 1.0]));
    },
    "should be able to compute binomial deviance": function (binomial) {
      var fam = binomial();
      assert.deepEqual(fam.deviance([1, 0], [0.2, 0.8]), -6.437751649736402);
    },
    "should accept a logit link function": function (binomial) {
      var fam = binomial(glm.links.Logit());
      assert.deepEqual(fam.link.f([0.5, 0.5]), $V([Math.log(1), Math.log(1)]));
    },
    "should default to logit link function when none is provided": function (binomial) {
      var fam = binomial();
      assert.deepEqual(fam.link.f([0.5, 0.5]), $V([Math.log(1), Math.log(1)]));
    }
  }
});

suite.addBatch({
  "gaussian": {
    topic: function() { return glm.families.Gaussian; },
    "should be able to compute gaussian deviance": function (gaussian) {
      var fam = gaussian(glm.links.Identity());
      assert.deepEqual(fam.deviance([1, 1], [2, 3]), 5);
    },
  }
});

suite.export(module);
