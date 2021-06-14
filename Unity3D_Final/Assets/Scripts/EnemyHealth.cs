using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
public class EnemyHealth : MonoBehaviour {

    public float enemyMaxHealth;
    public float damageModifier;
    public GameObject damageParticles;
    public GameObject drop;
    public bool drops;
    
    public AudioClip deathSound;
    public bool canBurn;
    public float burnDamage;
    public float burnTime;
    public GameObject burnEffects;

    bool onFire;
    float nextBurn;
    float burnInterval = 1f;
    float endBurn;

    float currentHealth;

   

    public Slider EnemyHealthIndicator;
    AudioSource enemyAS;

    public Text endGameText;


    // Start is called before the first frame update
    void Start() {
        currentHealth = enemyMaxHealth;
        EnemyHealthIndicator.maxValue = enemyMaxHealth;
        EnemyHealthIndicator.value = currentHealth;
        enemyAS = GetComponent<AudioSource>();
        
    }

    // Update is called once per frame
    void Update() {
        if(onFire && Time.time>nextBurn){
            addDamage(burnDamage);
            nextBurn += burnInterval;
        }


        if(onFire && Time.time > endBurn){
            onFire = false;
            burnEffects.SetActive(false);
        }
        
    }

    public void addDamage(float damage) {
        EnemyHealthIndicator.gameObject.SetActive(true);
        damage = damage * damageModifier;

        if(damage <= 0){
            return;
        }
       
        currentHealth -= damage;
        EnemyHealthIndicator.value = currentHealth;
        enemyAS.Play();

        if(currentHealth <= 0){
            makeDead();
        }
    }

    public void damageFX(Vector3 point, Vector3 rotation){
        Instantiate(damageParticles, point , Quaternion.Euler(rotation));
    }


    // public void AddFire(){
    //     if(!canBurn){
    //         return;
    //     }else{
    //         onFire =true;
    //         burnEffects.SetActive(true);
    //         endBurn = Time.time + burnTime;
    //         nextBurn = Time.time + burnInterval;
    //     }
    // }




    void makeDead(){
      
        AudioSource.PlayClipAtPoint(deathSound, transform.position, 0.15f);

        Destroy(gameObject.transform.root.gameObject);

        if(drops){
            Instantiate(drop, transform.position, transform.rotation);
        }


    }
}
