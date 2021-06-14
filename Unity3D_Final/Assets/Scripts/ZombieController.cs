using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ZombieController : MonoBehaviour {

    public GameObject flipModel;

    public AudioClip[] idleSounds;
    public float idleSoundTime;
    AudioSource enemyMovementAS;
    float nextIdleSound = 0f;

    public float detectionTime;
    float startRun;
    bool firstDetection;

    public float runSpeed;
    public float walkSpeed;

    public bool direita = true;

    float moveSpeed;
    bool running;

    Rigidbody myRB;
    Animator myAnim;
    Transform detectedPlayer;

    bool Detected;



    // Start is called before the first frame update
    void Start() {
        myRB = GetComponentInParent<Rigidbody>();
        myAnim = GetComponentInParent<Animator>();

        enemyMovementAS = GetComponent<AudioSource>();

        running = false;
        Detected = false;
        firstDetection = false;
        moveSpeed = walkSpeed;

        //diracao do enemy
        if(Random.Range(0, 10) > 5){
            Flip();
        }


    }


    // Update is called once per frame
    void FixedUpdate() {
        if(Detected){
            if(detectedPlayer.position.x < transform.position.x && direita){
                Flip();
            }else if(detectedPlayer.position.x > transform.position.x && !direita){
                Flip();
            }

            if(!firstDetection){
                startRun = Time.time + detectionTime;
                firstDetection = true;
            }

        }

        if(Detected && !direita){
            myRB.velocity = new Vector3((moveSpeed * -1) , myRB.velocity.y , 0);
        }else if(Detected && direita){
            myRB.velocity = new Vector3(moveSpeed  , myRB.velocity.y , 0);
        }

        if(!running && Detected){
            if(startRun < Time.time){
                moveSpeed = runSpeed;
                myAnim.SetTrigger("Run");
                running = true;
            }
        }


        if(!running){
            if(Random.Range(0,10) > 5  && nextIdleSound > Time.time){
                AudioClip tempClip = idleSounds[Random.Range(0 , idleSounds.Length)];
                enemyMovementAS.clip = tempClip;
                enemyMovementAS.Play();

                nextIdleSound = idleSoundTime + Time.time;
            }
        }
        
    }





    void OnTriggerEnter(Collider other){
        if(other.tag == "Player"  && !Detected){
            Detected =true;
            detectedPlayer = other.transform;
            myAnim.SetBool("Detected" , Detected);

            if(detectedPlayer.position.x < transform.position.x && direita){
                Flip();
            }else if(detectedPlayer.position.x > transform.position.x && !direita){
                Flip();
            }
        }
    }

    void OnTriggerExit( Collider other){
        if(other.tag == "Player"){
            firstDetection = false;
            if(running){
                myAnim.SetTrigger("Run");
                moveSpeed = walkSpeed;
                running = false;
            }
        }
    }


    void Flip(){
        direita = !direita;
        Vector3 theScale = flipModel.transform.localScale;
        theScale.z *=-1;
        flipModel.transform.localScale = theScale;
    }
}
