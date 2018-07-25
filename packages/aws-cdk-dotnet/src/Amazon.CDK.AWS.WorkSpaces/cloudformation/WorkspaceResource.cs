using Amazon.CDK;
using AWS.Jsii.Runtime.Deputy;
using System.Collections.Generic;

namespace Amazon.CDK.AWS.WorkSpaces.cloudformation
{
    /// <remarks>link: http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-workspaces-workspace.html </remarks>
    [JsiiClass(typeof(WorkspaceResource), "@aws-cdk/aws-workspaces.cloudformation.WorkspaceResource", "[{\"name\":\"parent\",\"type\":{\"fqn\":\"@aws-cdk/cdk.Construct\"}},{\"name\":\"name\",\"type\":{\"primitive\":\"string\"}},{\"name\":\"properties\",\"type\":{\"fqn\":\"@aws-cdk/aws-workspaces.cloudformation.WorkspaceResourceProps\"}}]")]
    public class WorkspaceResource : Resource
    {
        public WorkspaceResource(Construct parent, string name, IWorkspaceResourceProps properties): base(new DeputyProps(new object[]{parent, name, properties}))
        {
        }

        protected WorkspaceResource(ByRefValue reference): base(reference)
        {
        }

        protected WorkspaceResource(DeputyProps props): base(props)
        {
        }

        /// <summary>The CloudFormation resource type name for this resource class.</summary>
        [JsiiProperty("resourceTypeName", "{\"primitive\":\"string\"}")]
        public static string ResourceTypeName
        {
            get;
        }

        = GetStaticProperty<string>(typeof(WorkspaceResource));
        [JsiiMethod("renderProperties", "{\"collection\":{\"kind\":\"map\",\"elementtype\":{\"primitive\":\"any\"}}}", "[]")]
        protected override IDictionary<string, object> RenderProperties()
        {
            return InvokeInstanceMethod<IDictionary<string, object>>(new object[]{});
        }
    }
}