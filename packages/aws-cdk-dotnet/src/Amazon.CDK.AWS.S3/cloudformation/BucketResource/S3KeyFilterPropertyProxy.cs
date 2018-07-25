using Amazon.CDK;
using AWS.Jsii.Runtime.Deputy;

namespace Amazon.CDK.AWS.S3.cloudformation.BucketResource
{
    /// <remarks>link: http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-notificationconfiguration-config-filter-s3key.html </remarks>
    [JsiiInterfaceProxy(typeof(IS3KeyFilterProperty), "@aws-cdk/aws-s3.cloudformation.BucketResource.S3KeyFilterProperty")]
    internal class S3KeyFilterPropertyProxy : DeputyBase, IS3KeyFilterProperty
    {
        private S3KeyFilterPropertyProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>``BucketResource.S3KeyFilterProperty.Rules``</summary>
        /// <remarks>link: http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-notificationconfiguration-config-filter-s3key.html#cfn-s3-bucket-notificationconfiguraiton-config-filter-s3key-rules </remarks>
        [JsiiProperty("rules", "{\"union\":{\"types\":[{\"fqn\":\"@aws-cdk/cdk.Token\"},{\"collection\":{\"kind\":\"array\",\"elementtype\":{\"union\":{\"types\":[{\"fqn\":\"@aws-cdk/cdk.Token\"},{\"fqn\":\"@aws-cdk/aws-s3.cloudformation.BucketResource.FilterRuleProperty\"}]}}}}]}}")]
        public virtual object Rules
        {
            get => GetInstanceProperty<object>();
            set => SetInstanceProperty(value);
        }
    }
}