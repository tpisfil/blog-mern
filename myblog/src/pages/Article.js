import React, {useState, useEffect} from 'react';
import articleContent from './article-content';
import Articles from '../components/Articles';
import NotFound from './NotFound';
import CommentsList from '../components/CommentsList'; 
//to be able to see the comments for each article 
import AddCommentForm from '../components/AddCommentForm';

const Article = ({match}) => {
    const name = match.params.name;
    const article = articleContent.find( article => article.name === name );
    // const article = articleContent.find( articlehello => articlehello.name === name );

    const [articleInfo, setArticleInfo] = useState({
        comments: []
    }); 
    //state gives us a place to temporarily load our information that we call from the server
    //so in this case its going to be holding the comments 
    //you can usually have it as an empty object but we added the property comments

    //useEffect runs every time this component is called 
    //we usually want this so that it already has our data from whatever server or API 
    //we need already ready for us to use once the page has been loaded up. 

    useEffect(() => {
        const fetchData = async () => { //useEffect cannot use an async function so we have to create one inside of it
            const result = await fetch(`/api/articles/${name}`); //we added proxy in the package.json file which allows us access to this
            //await will make sure we wait to fetch the info from the server and then move on with the rest of the code
            const body = await result.json();
            console.log("this is the body we get ");
            console.log(body);
            console.log("blah balh blha ");

            setArticleInfo(body); 
        };
        fetchData(); //now we're calling the function that we just defined up there ^ 
    }, [name]); 


    if (!article) return <NotFound />

    const otherArticles = articleContent.filter(article => article.name !== name)

    return (
        <>
            <h1 className="sm:text-4xl text-2xl font-bold mt-6 pt-20 text-gray-900">{article.title}</h1>
            {article.content.map( (paragraph,index) => (
                <p className='mx-auto leading-relaxed text-base mb-4' key={index}>{paragraph}</p>
            ))}

            <CommentsList comments={articleInfo.comments}/>
            <AddCommentForm articleName={name} setArticleInfo={setArticleInfo}/>

            <h1 className='sm:text-2x text-xl font-bold mt-4 mb-4 text-gray-900'>Other Articles</h1>
            <div className="flex flex-wrap -m-4">
                <Articles articles={otherArticles} />
            </div>
        </>
    );
};

export default Article; 